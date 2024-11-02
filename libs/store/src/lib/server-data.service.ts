import { computed, Injectable, Signal } from '@angular/core';
import { FirestoreBaseDataService } from './firestore-base-data.service';
import { Server } from './model';

@Injectable({
	providedIn: 'root'
})
export class ServerDataService extends FirestoreBaseDataService<Server> {
	public constructor() {
		super();
	}

	public override list(documentName?: string, fieldName?: string): Signal<Server[]> {
		const entity$$ = super.list(documentName, fieldName);
		const servers$$ = computed<Server[]>(() => {
			if (entity$$() !== null) {
				const map = new Map(Object.entries(entity$$()));
				return Array.from(map.values());
			}
			return entity$$();
		});
		return servers$$;
	}
}
