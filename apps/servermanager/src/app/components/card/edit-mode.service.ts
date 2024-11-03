import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type editMode = { id: number; edit: boolean };

@Injectable({
	providedIn: 'root'
})
export class EditModeService {
	public editMode$: BehaviorSubject<editMode | null> = new BehaviorSubject<editMode | null>(null);

}
