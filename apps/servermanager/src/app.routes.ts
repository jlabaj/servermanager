import { Routes } from "@angular/router";
import { OverviewComponent } from "./app/components/overview/overview.component";
import { DashboardComponent } from "./app/components/dashboard/dashboard.component";

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'dashboard', component: DashboardComponent },
  ];
  