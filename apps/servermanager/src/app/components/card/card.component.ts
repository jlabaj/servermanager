import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, effect, HostListener, inject, input, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Server, ServerDataService } from '@serverManager/store';
import { Subscription } from 'rxjs';
import { CircleSvgComponent } from './circle-icon/circle-icon.component';
import { ServerStatusService } from './server-status.service';

@Component({
	selector: 'sm-card',
	standalone: true,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CircleSvgComponent],
})
export class CardComponent implements AfterViewInit {
	@Input() public server: Server = new Server();
	@Input() public id = 0;
	public isMobile$$ = input<boolean>();
	public readonly maxLengthValidation = 10;
	public labelFormControl = new FormControl(this.server?.label, this.server?.validation ? [Validators.required, Validators.maxLength(this.maxLengthValidation)] : null);
	public formGroup: FormGroup = new FormGroup({
		label: this.labelFormControl
	});
	public isEditing$$ = signal<boolean | null>(null);
	public static ACTIVATE = 'aktivieren';
	public static DEACTIVATE = 'deaktivieren';
	public activateButtonLabel = CardComponent.ACTIVATE;
	public isActiveLabel$$ = signal<string>(CardComponent.ACTIVATE);
	private serverDataService = inject(ServerDataService);
	private subs = new Subscription();
	private serverStatusService = inject(ServerStatusService);

	@HostListener('document:click', ['$event.target'])
	public onClick(targetElement: HTMLElement): void {
		if (targetElement.id === `titleinput${this.id}` || targetElement.id === `titleform${this.id}`) {
			return;
		}
		this.isEditing$$.set(targetElement.id === `cardtitle${this.id}`);
	}

	public constructor() {
		effect(() => {
			if (!this.isEditing$$() && this.isEditing$$() !== null) {
				if (this.formGroup.valid) {
					this.serverDataService.updateServer(this.server);
				} else {
					this.labelFormControl.setValue(this.labelFormControl.value ? this.labelFormControl.value.slice(0, this.maxLengthValidation) : this.labelFormControl.value);
					this.server.label = this.labelFormControl.value ?? '';
				}
			}
		});
	}

	public ngAfterViewInit(): void {
		this.labelFormControl.setValue(this.server.label);
		this.formGroup = new FormGroup({
			label: this.labelFormControl
		});
		this.subs.add(this.labelFormControl.valueChanges.subscribe(value => {
			if (value !== null && this.formGroup.valid) {
				this.server.label = value ?? '';
			}
		}));
		this.isActiveLabel$$.set(this.server.active ? CardComponent.DEACTIVATE : CardComponent.ACTIVATE);
	}

	public onActivateToggleClick(): void {
		this.isActiveLabel$$.set(!this.server.active ? CardComponent.DEACTIVATE : CardComponent.ACTIVATE);
		this.serverDataService.updateServerActivation(this.server, !this.server.active).then(() => {
			this.serverDataService.list();
			this.serverStatusService.statusUpdated$.next(true);
		});
	}

}
