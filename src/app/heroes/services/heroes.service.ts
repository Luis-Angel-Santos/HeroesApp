import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collectionData, Firestore, collection, where, onSnapshot, doc, getDoc } from '@angular/fire/firestore';
import { Heroe } from '../interfaces/heroes.interface';
import { query } from '@firebase/firestore';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { get } from 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  placeRef = collection(this.firestore, 'heroes'); 

  constructor(private firestore: Firestore,
              private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]>{
    return collectionData(this.placeRef, {idField: 'id'}) as Observable<Heroe[]>
  }

  async getHeroePorId(id: string){
    var datosHeroe = await getDoc(doc(this.firestore, 'heroes', id))
    .then((doc) => {
      if(doc.exists()){
        const datosHeroe: Heroe = {
          superhero: doc.data()['superhero'],
          publisher: doc.data()['publisher'],
          alter_ego: doc.data()['alter_ego'],
          first_appearance: doc.data()['first_appearance'],
          characters: doc.data()['characters'],
          id: doc.data()['id'],
          alt_img: doc.data()['alt_img']
        }
        return datosHeroe;
      }else{
        console.log("No such document!");
        return;
      }
    });
    return datosHeroe;
  }


}
