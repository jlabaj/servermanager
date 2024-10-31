import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { searchIndex } from '../shared/elastic-client';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { addDoc, arrayUnion, collection, collectionData, CollectionReference, doc, DocumentReference, FieldValue, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';

type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <mat-toolbar color="primary"> Responsive Card Grid </mat-toolbar>
    <div class="container responsive-grid">
      <mat-card *ngFor="let card of cards()">
        <mat-card-header>
          <mat-card-title>{{ card.title }} </mat-card-title>
        </mat-card-header>
        <br />
        <img mat-card-image [src]="card.imageUrl" />
        <mat-card-content>
          <br />
          <p>
            {{ card.description }}
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>LIKE</button>
          <button mat-button>SHARE</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 24px;
      }

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .responsive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 24px;
      }
    `,
  ],
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule],
})
export class AppComponent {
  cards = signal<CardContent[]>([]);

  images = [
    'nature',
    'sky',
    'grass',
    'mountains',
    'rivers',
    'glacier',
    'forest',
    'streams',
    'rain',
    'clouds',
  ];

  public httpClient = inject(HttpClient);
  firestore: Firestore = inject(Firestore);
  
  // usersCollection: CollectionReference;
  

  constructor() {
    
    const cards: CardContent[] = [];
    for (let i = 0; i < this.images.length; i++) {
      cards.push({
        title: `Card ${i + 1}`,
        description: `Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. `,
        imageUrl: `https://source.unsplash.com/random/500X500?${this.images[i]}`,
      });
    }

    this.cards.set(cards);
    this.search();
    const aCollection = collection(this.firestore, 'servers');
    
    // await docRef.update({regions: FieldValue.arrayUnion('Northern Virginia')});
    const serversRef = doc(aCollection, 'servers');
    updateDoc(serversRef,{
      servers: arrayUnion({active:false,label:'jakub',path:'jakub'})
    })
  }
    // serversRef.u({regions: FieldValue.arrayUnion('Northern Virginia')});
    // getDoc(serversRef).then((doc) => {

    // });
  //   collectionData(aCollection).subscribe((res) => alert(JSON.stringify(res)));
  //   addDoc(aCollection, {server: {
  //   label: "Jakub1",
  //   active: false
  // }}).then((documentReference: DocumentReference) => {
  //     // the documentReference provides access to the newly created document
  // });   not

  // getPosts(): Observable<any[]> {
  //   return this.firestore.collection('servers').valueChanges();
  // }
  // addPost(post: any) {
  //   return this.firestore.collection('servers').add('bla');
  // }

  private async search() {
    // Step 1
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: 'ApiKey eDJnajJwSUI1VDVCMmRya3F0LU86TjFoMHhfeDNRZEs0aTVVWVVPbk1mQQ==',
      'Content-Type': 'application/json'
    });
    // Step 2
    this.httpClient.post('https://93f76a47a8f3448383a7f18ac460ad1e.europe-west3.gcp.cloud.es.io:443/servermanager/_search', {
      query: {
        bool: {
          must: [
            {
              exists: {
                field: "*server"
              }
            }
          ]
        }
      },
      _source: true
    }, { headers: httpHeaders }).subscribe();
    // const bla = await searchIndex('servermanager','server')
  }
}



// {
//   "id": "FcyK2pIB4FAOoUbOLTsa",
//   "name": "servermanager",
//   "expiration": 1735427341596,
//   "api_key": "mm6muS2lRhuCZZ4D1Pc6pg",
//   "encoded": "RmN5SzJwSUI0RkFPb1ViT0xUc2E6bW02bXVTMmxSaHVDWlo0RDFQYzZwZw==",
//   "beats_logstash_format": "FcyK2pIB4FAOoUbOLTsa:mm6muS2lRhuCZZ4D1Pc6pg"
// }
