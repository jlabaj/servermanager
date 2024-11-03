import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, inject, model, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { where } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
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
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, FormsModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatSidenavModule, DashboardComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CardComponent, MatDividerModule],
})
export class OverviewComponent implements AfterViewInit {
	public serverDataService = inject(ServerDataService);
	public servers$$: Signal<Server[]> = this.serverDataService.servers$$;
	public isMobile$$: Signal<BreakpointState | undefined> = signal<BreakpointState | undefined>(undefined);
	public query$$ = this.serverDataService.query$$;
	private breakpointObserver = inject(BreakpointObserver);
	public readonly search$$ = model('');

	public constructor() {
		let breakpointObserver$ = this.breakpointObserver.observe(Breakpoints.Handset);
		this.isMobile$$ = toSignal(breakpointObserver$);
		effect(() => {
			if (this.search$$()) {
				this.serverDataService.queryData(where('label', '>=', this.search$$()), where('label', '<=', this.search$$() + '\uf8ff'));


				this.servers$$ = this.serverDataService.query$$;
			} else {
				this.serverDataService.list();
				this.servers$$ = this.serverDataService.servers$$;
			}
		});
	}
	public ngAfterViewInit(): void {
		this.query$$ = this.serverDataService.query$$;
		this.serverDataService.queryData(where('active', '==', true));
		// this.query$$ = this.serverDataService.query$$;
	}

	public clearSearch(): void {
		this.search$$.set('');
	}
}
