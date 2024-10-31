import { Routes } from "@angular/router";
import { OverviewComponent } from "./app/components/overview/overview.component";
import { DashboardComponent } from "./app/components/dashboard/dashboard.component";
import { ServiceManagerComponent } from "./app/server-manager.component";

export const routes: Routes = [
    { path: '', component: ServiceManagerComponent },
    { path: 'overview', component: OverviewComponent },
    { path: 'dashboard', component: DashboardComponent },
  ];
  