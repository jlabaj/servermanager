import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, Input, input, OnDestroy, Signal, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Server, ServerDataService } from '@serverManager/store';
import { where } from 'firebase/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { ServerStatusService } from '../card/server-status.service';

@Component({
	selector: 'sm-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatCheckboxModule, FormsModule, MatButtonModule, MatDividerModule, MatListModule],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
	public inputDataSource$$ = input<Server[]>([]);
	@Input() public isActiveServerDashboard = false;
	public dataSource$$: Signal<Server[] | undefined> = signal<Server[]>([]);
	public serverDataService = inject(ServerDataService);
	public static ACTIVATE = 'aktivieren';
	public static DEACTIVATE = 'deaktivieren';
	public generalValidation = true;
	private cdr = inject(ChangeDetectorRef);
	private subs = new Subscription();
	private dashboardQuery$ = new Observable<Server[]>();
	private serverStatusService = inject(ServerStatusService);


	public dataSource = new MatTableDataSource<Server>(this.dataSource$$() ?? []);

	public displayedColumns: string[] = ['label', 'active', 'validation'];

	public readonly checked = false;

	public isActiveLabel$$ = signal<string>(DashboardComponent.ACTIVATE);

	@ViewChild(MatPaginator) public paginator: MatPaginator | null = null;

	public ngAfterViewInit(): void {
		if (this.checked || this.isActiveServerDashboard) {
			this.subs.add(this.dashboardQuery$.subscribe((data) => {
				this.dataSource = new MatTableDataSource<Server>(data);
				this.cdr.markForCheck();
			}));
			this.serverDataService.queryData(where('active', '==', true));
		} else {
			this.serverDataService.list();
		}
		this.dataSource.paginator = this.paginator;
	}

	public onValidationChange($event: MatSlideToggleChange, server: Server): void {
		server.validation = $event.checked;
		this.serverDataService.updateServerValidation(server, $event.checked);
	}

	public onCheckboxValueChanged(): void {
		if (this.checked) {
			this.subs.add(this.dashboardQuery$.subscribe((data) => {
				this.dataSource = new MatTableDataSource<Server>(data);
				this.cdr.markForCheck();
			}));
			this.serverDataService.queryData(where('active', '==', true));
		} else {
			this.serverDataService.list();
		}
	}

	public constructor() {
		this.dashboardQuery$ = from(this.serverDataService.queryData(where('active', '==', true)));
		effect(() => {
			if (this.serverDataService.servers$$() && !this.isActiveServerDashboard) {
				this.dataSource = new MatTableDataSource<Server>(this.serverDataService.servers$$());
				this.cdr.markForCheck();
			}
		});

		this.serverStatusService.statusUpdated$.subscribe(() => {
			this.subs.add(from(this.serverDataService.queryData(where('active', '==', true))).subscribe((data) => {
				if (this.checked || this.isActiveServerDashboard) {
					this.dataSource = new MatTableDataSource<Server>(data);
					this.cdr.markForCheck();
				}
			}));
			this.cdr.markForCheck();
		});
	}
	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	public onActivateValidationToggleClick(): void {
		this.isActiveLabel$$.set(this.generalValidation ? DashboardComponent.DEACTIVATE : DashboardComponent.ACTIVATE);
		this.serverDataService.batchUpdateServerValidation(this.generalValidation);
		this.generalValidation = !this.generalValidation;
	}
}
