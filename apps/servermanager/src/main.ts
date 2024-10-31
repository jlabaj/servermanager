import { bootstrapApplication } from '@angular/platform-browser';
import { ServiceManagerComponent } from './app/server-manager.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideHttpClient } from '@angular/common/http';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

bootstrapApplication(ServiceManagerComponent, {
  providers: [importProvidersFrom(BrowserAnimationsModule), provideHttpClient(), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"servermanager-edac4","appId":"1:1041712167433:web:8726db3b5e3e82ac1756d8","databaseURL":"https://servermanager-edac4-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"servermanager-edac4.appspot.com","apiKey":"AIzaSyBCSNW9K6QChCKPVty3NiAsLicWoW3GuvE","authDomain":"servermanager-edac4.firebaseapp.com","messagingSenderId":"1041712167433"})), 
    provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
}).catch((err) => console.error(err));
