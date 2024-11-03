import { computed, Injectable, signal, Signal } from '@angular/core';
import { FirestoreBaseDataService } from './firestore-base-data.service';
import { Server } from './model';

@Injectable({
	providedIn: 'root'
})
export class ServerDataService extends FirestoreBaseDataService<Server> {
	public constructor() {
		super();
	}

	private _servers$$: Signal<Server[]> = signal<Server[]>(null as unknown as Server[]);

	public get servers$$(): Signal<Server[]> {
		return this._servers$$;
	}

	public override list(documentName?: string, fieldName?: string): Signal<Server[]> {
		const entity$$ = super.list(documentName, fieldName);
		this._servers$$ = computed<Server[]>(() => {
			if (entity$$() !== null) {
				const map = new Map(Object.entries(entity$$()));
				return Array.from(map.values());
			}
			return entity$$();
		});
		return this.servers$$;
	}

	public updateServer(server: Server | undefined): Promise<unknown> {
		return server ? super.update(server.id, server) : Promise.resolve();
	}

	public updateServerValidation(server: Server, validation: boolean): Promise<unknown> {
		return super.update(server.id, server, 'validation', validation);
	}

	public updateServerActivation(server: Server | undefined, active: boolean): Promise<unknown> {
		return server ? super.update(server.id, server, 'active', active) : Promise.resolve();
	}
	public batchUpdateServerValidation(validation: boolean): void {
		super.batchUpdate(undefined, 'validation', validation);
	}
}
