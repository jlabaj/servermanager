import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Server, ServerDataService } from '@serverManager/store';

@Component({
	selector: 'sm-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSlideToggleModule],
})
export class DashboardComponent implements AfterViewInit {
	public displayedColumns: string[] = ['label', 'active', 'validation'];

	@ViewChild(MatPaginator) public paginator: MatPaginator | null = null;

	public dataSource = new MatTableDataSource<Server>(inject(ServerDataService).list()() ?? []);
	private serverDataService = inject(ServerDataService);

	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	public onValidationChange($event: MatSlideToggleChange, server: Server): void {
		server.validation = $event.checked;
		this.serverDataService.updateServerValidation($event.checked, +server.id);
	}
}
