import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, effect, HostListener, inject, input, Input, signal } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'sm-card',
	standalone: true,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CircleSvgComponent],
})
export class CardComponent {
	private _server: Server = new Server();

	public get server(): Server {
		return this._server;
	}
	@Input() set server(value: Server) {
		this._server = value;
		this.labelFormControl.setValue(this.server.label);
		this.labelFormControl.setValidators(this.server?.validation ? [Validators.required, Validators.maxLength(this.maxLengthValidation)] : null);
		this.formGroup = new FormGroup({
			label: this.labelFormControl
		});
	}
	@Input() public id = 0;
	public isMobile$$ = input<boolean>();
	public readonly maxLengthValidation = 10;
	private readonly validators = this.server?.validation ? [Validators.required, Validators.maxLength(this.maxLengthValidation)] : null;
	public labelFormControl = new FormControl(this.server?.label, this.validators);
	public formGroup = new FormGroup({
		label: this.labelFormControl
	});
	public isEditing$$ = signal<boolean | null>(null);
	public static ACTIVATE = 'aktivieren';
	public static DEACTIVATE = 'deaktivieren';
	public activateButtonLabel = CardComponent.ACTIVATE;
	public isActiveLabel$$ = signal<string>(CardComponent.ACTIVATE);
	private serverDataService = inject(ServerDataService);
	private serverStatusService = inject(ServerStatusService);
	private destroyRef = inject(DestroyRef);

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
		this.labelFormControl.valueChanges.pipe(
			takeUntilDestroyed(this.destroyRef)
		  ).subscribe(value => {
			if (value !== null && this.formGroup.valid) {
				this.server.label = value ?? '';
			}
		});
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
