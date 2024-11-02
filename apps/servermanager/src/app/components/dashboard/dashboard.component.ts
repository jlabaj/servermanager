import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Server, ServerDataService } from '@serverManager/store';

@Component({
	selector: 'sm-dashboard',
	standalone: true,
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	imports: [CommonModule, MatTableModule, MatPaginatorModule],
})
export class DashboardComponent implements AfterViewInit {
	public displayedColumns: string[] = ['label', 'active'];

	@ViewChild(MatPaginator) public paginator: MatPaginator | null = null;

	public dataSource = new MatTableDataSource<Server>(inject(ServerDataService).list()() ?? []);

	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

}
