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
	public labelFormControl = new FormControl(this.server?.label, this.server?.validation ? [Validators.required, Validators.maxLength(5)] : null);
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
				this.serverDataService.updateServer(this.server);
			}
		});
	}

	public ngAfterViewInit(): void {
		this.labelFormControl = new FormControl(this.server?.label, this.server?.validation ? [Validators.required, Validators.maxLength(5)] : null);
		this.formGroup = new FormGroup({
			label: this.labelFormControl
		});
		this.subs.add(this.labelFormControl.valueChanges.subscribe(value => {
			if (value !== null) {
				this.server.label = value ?? '';
			}
		}));
		this.isActiveLabel$$.set(this.server.active ? CardComponent.DEACTIVATE : CardComponent.ACTIVATE);
	}

	public onActivateToggleClick(): void {
		this.isActiveLabel$$.set(!this.server.active ? CardComponent.DEACTIVATE : CardComponent.ACTIVATE);
		this.serverDataService.updateServerActivation(this.server, !this.server.active);
	}

}
