import { CommonModule } from '@angular/common';
import { Component, effect, inject, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
	public formGroups: FormGroup[] = [];
	public servers$$: Signal<Server[]> = inject(ServerDataService).list();
	public servers: Server[] = [];
	public isEditing = false;

	public constructor() {
		effect(() => {
			for (const { } of this.servers$$() ?? []) {
				this.formGroups.push(new FormGroup({
					label: new FormControl('', [Validators.required, Validators.maxLength(5)])
				}));
			}
		});
	}

	public toggleEditMode(): void {
		this.isEditing = !this.isEditing;
	}
}
