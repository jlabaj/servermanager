import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { CardContent } from './models';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sm-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  imports: [CommonModule, CommonModule, MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule,],
})
export class OverviewComponent implements OnInit {

  cards = signal<CardContent[]>([]);


  public httpClient = inject(HttpClient);
  firestore: Firestore = inject(Firestore);


  constructor() {

    const cards: CardContent[] = [];
    const aCollection = collection(this.firestore, 'servers');
    getDoc(doc(aCollection, 'servers')).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const result = data['servers'] || [];

        this.cards.set(result);
      } else {
        console.log("No such document!");
      }
    });
  }

  ngOnInit(): void {
  }

}
