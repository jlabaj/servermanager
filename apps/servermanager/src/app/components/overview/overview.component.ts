import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Server, ServerDataService } from '@serverManager/store';
import { CardComponent } from '../card/card.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
	selector: 'sm-overview',
	standalone: true,
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss'],
	imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatSidenavModule, DashboardComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CardComponent],
})
export class OverviewComponent {
	public showFiller = false;
	public servers$$: Signal<Server[]> = inject(ServerDataService).list();
	public isMobile$$: Signal<BreakpointState | undefined> = signal<BreakpointState | undefined>(undefined);
	private breakpointObserver = inject(BreakpointObserver);

	public constructor() {
		let breakpointObserver$ = this.breakpointObserver.observe(Breakpoints.Handset);
		this.isMobile$$ = toSignal(breakpointObserver$);
	}
}
