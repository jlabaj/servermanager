import { inject, Signal, signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, query, QueryFieldFilterConstraint, setDoc, updateDoc } from '@angular/fire/firestore';
import { EntityBase } from './model';

export class FirestoreBaseDataService<T extends EntityBase> {
	private firestore: Firestore = inject(Firestore);
	private static SERVERS_COLLECTION = 'servers';
	private static SERVERS_FIELD = 'servers';
	private collection = collection(this.firestore, FirestoreBaseDataService.SERVERS_COLLECTION, FirestoreBaseDataService.SERVERS_COLLECTION, FirestoreBaseDataService.SERVERS_COLLECTION);
	private document = doc(this.collection, FirestoreBaseDataService.SERVERS_COLLECTION);

	private _entity$$ = signal<T[]>(null as unknown as T[]);

	public get entity$$(): Signal<T[]> {
		return this._entity$$.asReadonly();
	}

	private _query$$ = signal<T[]>(null as unknown as T[]);

	public get query$$(): Signal<T[]> {
		return this._query$$.asReadonly();
	}

	public constructor(private collectionName?: string, private documentName?: string) {
		collectionName ? this.collection = collection(this.firestore, collectionName) : null;
		documentName ? this.document = doc(this.collection, documentName) : null;
	}

	public list(documentName?: string, fieldName?: string): Signal<T[]> {
		onSnapshot(query(this.collection), (querySnapshot) => {
			const entities: T[] = [];
			querySnapshot.forEach((doc) => {
				entities.push(doc.data() as T);
			});
			this._entity$$.set(entities);
		});
		return this._entity$$.asReadonly();
	}

	public queryData(queryExp: QueryFieldFilterConstraint): Signal<T[]> {
		const q = query(this.collection, queryExp);
		getDocs(q).then((querySnapshot) => {
			const entities: T[] = [];
			querySnapshot.forEach((doc) => {
				entities.push(doc.data() as T);
			});

			this._query$$.set(entities);
		});
		return this._query$$.asReadonly();
	}

	public add(entity: T, documentName?: string): Promise<unknown> {
		if (documentName) {
			setDoc(doc(this.collection, documentName), entity);
		}
		return addDoc(this.collection, entity);
	}

	public update<F>(entity: T, path?: string, field?: F): Promise<unknown> {
		const serversRef = doc(this.collection, entity.id);
		let result;
		if (path) {
			result = updateDoc(serversRef, `${path}`, field !== undefined ? field : entity);
		} else {
			result = updateDoc(serversRef, entity as object);
		}
		return result;
	}

	public delete(documentName?: string): Promise<void> {
		return deleteDoc(this.getDocument(documentName));
	}

	private getDocument = (documentName?: string) => documentName ? doc(this.collection, documentName) : this.document;
}
