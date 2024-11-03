import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, input, model, Signal, signal, ViewChild } from '@angular/core';
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

@Component({
	selector: 'sm-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatCheckboxModule, FormsModule, MatButtonModule, MatDividerModule, MatListModule],
})
export class DashboardComponent implements AfterViewInit {
	public inputDataSource$$ = input<Server[]>([]);
	public isActiveServerDashboard$$ = input<boolean>(false);
	public dataSource$$: Signal<Server[] | undefined> = signal<Server[]>([]);
	public serverDataService = inject(ServerDataService);
	public static ACTIVATE = 'aktivieren';
	public static DEACTIVATE = 'deaktivieren';
	public generalValidation = true;
	private cdr = inject(ChangeDetectorRef);


	public dataSource = new MatTableDataSource<Server>(this.dataSource$$() ?? []);

	public displayedColumns: string[] = ['label', 'active', 'validation'];

	public readonly checked$$ = model(false);

	public isActiveLabel$$ = signal<string>(DashboardComponent.ACTIVATE);

	@ViewChild(MatPaginator) public paginator: MatPaginator | null = null;

	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	public onValidationChange($event: MatSlideToggleChange, server: Server): void {
		server.validation = $event.checked;
		this.serverDataService.updateServerValidation(server, $event.checked);
	}

	public constructor() {
		effect(() => {
			if (this.checked$$() || this.isActiveServerDashboard$$()) {
				this.serverDataService.queryData(where('active', '==', true));
			}
			else {
				this.serverDataService.list();
			}
		});
		effect(() => {
			if (this.serverDataService.query$$()) {
				this.dataSource = new MatTableDataSource<Server>(this.serverDataService.query$$());
				this.cdr.markForCheck();
			}
		});
		effect(() => {
			if (this.serverDataService.servers$$()) {
				this.dataSource = new MatTableDataSource<Server>(this.serverDataService.servers$$());
				this.cdr.markForCheck();
			}
		});
	}

	public onActivateToggleClick(): void {
		this.generalValidation = !this.generalValidation;
		this.isActiveLabel$$.set(!this.generalValidation ? DashboardComponent.DEACTIVATE : DashboardComponent.ACTIVATE);
		this.serverDataService.batchUpdateServerValidation(this.generalValidation);
	}
}
