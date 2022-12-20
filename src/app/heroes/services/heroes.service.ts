import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { child, get, getDatabase, ref } from 'firebase/database';
import { Observable } from 'rxjs';
import { setDoc, doc, getFirestore, collection } from 'firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  app = initializeApp(environment.firebase);

  constructor(private firestore: Firestore) { }

  getHeroes(): Observable<Heroe[]>{
    const placeRef = collection(this.firestore, 'heroes'); 
    return collectionData(placeRef, {idField: 'id'}) as Observable<Heroe[]>
}

}
