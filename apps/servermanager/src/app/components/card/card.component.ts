import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Server } from '@serverManager/store';

@Component({
	selector: 'sm-card',
	standalone: true,
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
})
export class CardComponent {
	@Input() public server: Server | null = null;
	public formGroup: FormGroup = new FormGroup({
		label: new FormControl('', [Validators.required, Validators.maxLength(5)])
	});
	public isEditing = false;

	public toggleEditMode(): void {
		this.isEditing = !this.isEditing;
	}
}
