import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type editMode = { id: number; edit: boolean };

@Injectable({
	providedIn: 'root'
})
export class ServerStatusService {
	public statusUpdated$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

}
