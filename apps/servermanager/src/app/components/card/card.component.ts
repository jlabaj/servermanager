import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, ElementRef, HostListener, inject, input, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Server, ServerDataService } from '@serverManager/store';

import { Directive, EventEmitter, Output } from '@angular/core';
import { CircleSvgComponent } from './circle-icon/circle-icon.component';

@Directive({
	selector: '[appClickOutside]',
	standalone: true,
})
export class ClickOutsideDirective {
	@Output() public clickOutside = new EventEmitter<void>();

	public constructor(private elementRef: ElementRef) { }

	@HostListener('document:click', ['$event.target'])
	public onClick(targetElement: HTMLElement): void {
		const clickedInside = this.elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.clickOutside.emit();
		}
	}
}

@Component({
	selector: 'sm-card',
	standalone: true,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, ClickOutsideDirective, CircleSvgComponent],
})
export class CardComponent implements AfterViewInit {
	@Input() public server: Server = new Server();
	@Input() public id = 0;
	public isMobile$$ = input<boolean>();
	public formGroup: FormGroup = new FormGroup({
		label: new FormControl('', this.server.validation ? [Validators.required, Validators.maxLength(5)] : null)
	});
	public isEditing$$ = signal<boolean | null>(null);
	public static ACTIVATE = 'aktivieren';
	public static DEACTIVATE = 'deaktivieren';
	public activateButtonLabel = CardComponent.ACTIVATE;
	public isActiveLabel$$ = signal<string>(CardComponent.ACTIVATE);
	private serverDataService = inject(ServerDataService);

	public toggleEditMode(): void {
		this.isEditing$$.set(!this.isEditing$$());
	}

	public onClickedOutside(): void {
		this.isEditing$$.set(false);
	}

	public constructor() {
		effect(() => {
			if (!this.isEditing$$() && this.isEditing$$() !== null) {
				this.serverDataService.updateServer(this.server);
			}
		});
	}

	public ngAfterViewInit(): void {
		this.formGroup = new FormGroup({
			label: new FormControl('', this.server.validation ? [Validators.required, Validators.maxLength(5)] : null)
		});
		this.isActiveLabel$$.set(this.server.active ? CardComponent.DEACTIVATE : CardComponent.ACTIVATE);
	}

	public onActivateToggleClick(): void {
		this.isActiveLabel$$.set(!this.server.active ? CardComponent.DEACTIVATE : CardComponent.ACTIVATE);
		this.serverDataService.updateServerActivation(this.server, !this.server.active);
	}

}
