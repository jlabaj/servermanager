import { inject, Signal, signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { EntityBase } from './model';

export class FirestoreBaseDataService<T extends EntityBase> {
	private firestore: Firestore = inject(Firestore);
	private static SERVERS_COLLECTION = 'servers';
	private static SERVERS_FIELD = 'servers';
	private collection = collection(this.firestore, FirestoreBaseDataService.SERVERS_COLLECTION);
	private document = doc(this.collection, FirestoreBaseDataService.SERVERS_COLLECTION);

	public entity$$ = signal<T[]>(null as unknown as T[]);

	public constructor(private collectionName?: string, private documentName?: string) {
		collectionName ? this.collection = collection(this.firestore, collectionName) : null;
		documentName ? this.document = doc(this.collection, documentName) : null;
	}

	public get(documentName: string): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			getDoc(this.getDocument(documentName)).then((docSnap) => {
				if (docSnap.exists()) {
					const data = docSnap.data();
					const result = data['servers'] || [];
					resolve({ ...result });
				} else {
					console.log('No such document!');
				}
			});
		});
	}

	public list(documentName?: string, fieldName?: string): Signal<T[]> {
		onSnapshot(this.getDocument(documentName), (doc) => {
			this.entity$$.set(doc.data()?.[fieldName ?? FirestoreBaseDataService.SERVERS_FIELD] as T[]);
		});
		return this.entity$$.asReadonly();
	}

	public add(entity: T, documentName?: string): Promise<unknown> {
		if (documentName) {
			setDoc(doc(this.collection, documentName), entity);
		}
		return addDoc(this.collection, entity);
	}

	public update(entity: T, path: string): Promise<unknown> {
		const serversRef = doc(this.collection, 'servers');
		return updateDoc(serversRef, `${path}`, entity);
	}

	public delete(documentName?: string): Promise<void> {
		return deleteDoc(this.getDocument(documentName));
	}

	private firebaseSerialize<T>(object: T) {
		return JSON.parse(JSON.stringify(object));
	}

	private getDocument = (documentName?: string) => documentName ? doc(this.collection, documentName) : this.document;
}
