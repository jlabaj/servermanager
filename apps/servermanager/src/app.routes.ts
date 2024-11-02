import { Routes } from '@angular/router';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { OverviewComponent } from './app/components/overview/overview.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'overview', pathMatch: 'full' },
	{ path: 'overview', component: OverviewComponent, },
	{ path: 'dashboard', component: DashboardComponent },
];
