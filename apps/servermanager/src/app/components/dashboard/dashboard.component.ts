import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, inject, input, model, Signal, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
	imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule, MatCheckboxModule, FormsModule],
})
export class DashboardComponent implements AfterViewInit {
	public inputDataSource$$ = input<Server[]>([]);
	public dataSource$$: Signal<Server[] | undefined> = signal<Server[]>([]);
	public serverDataService = inject(ServerDataService);

	public dataSource = new MatTableDataSource<Server>(this.dataSource$$() ?? []);

	public displayedColumns: string[] = ['label', 'active', 'validation'];

	public readonly checked$$ = model(false);

	@ViewChild(MatPaginator) public paginator: MatPaginator | null = null;

	public ngAfterViewInit(): void {
		this.dataSource = new MatTableDataSource<Server>(this.inputDataSource$$() ?? this.serverDataService.servers$$());
		this.dataSource.paginator = this.paginator;
	}

	public onValidationChange($event: MatSlideToggleChange, server: Server): void {
		server.validation = $event.checked;
		this.serverDataService.updateServerValidation(server, $event.checked);
	}

	public constructor() {
		effect(() => {
			if (this.checked$$()) {
				this.serverDataService.queryData(where('active', '==', true));
				this.dataSource = new MatTableDataSource<Server>(this.serverDataService.query$$());
			} else {
				this.dataSource = new MatTableDataSource<Server>(this.serverDataService.servers$$());
			}
		});
	}
}
