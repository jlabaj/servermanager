import { Injectable } from '@angular/core';
import { FirestoreBaseDataService } from './firestore-base-data.service';
import { Server } from './model';

@Injectable({
	providedIn: 'root'
})
export class ServerDataService extends FirestoreBaseDataService<Server> {
	public constructor() {
		super();
	}
}
