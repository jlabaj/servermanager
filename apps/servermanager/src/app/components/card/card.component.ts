import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, HostListener, inject, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Server, ServerDataService } from '@serverManager/store';

import { Directive, EventEmitter, Output } from '@angular/core';

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
	imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, ClickOutsideDirective],
})
export class CardComponent {
	@Input() public server: Server = new Server();
	@Input() public id: number = 0;
	public formGroup: FormGroup = new FormGroup({
		label: new FormControl('', [Validators.required, Validators.maxLength(5)])
	});
	public isEditing$$ = signal<boolean>(false);
	public serverDataService = inject(ServerDataService);

	public toggleEditMode(): void {
		this.isEditing$$.set(!this.isEditing$$());
	}

	public onClickedOutside(): void {
		this.isEditing$$.set(false);
	}

	public constructor() {
		effect(() => {
			if (!this.isEditing$$()) {
				this.serverDataService.update(this.server, `servers.${this.id}`);
			}
		});
	}

}
