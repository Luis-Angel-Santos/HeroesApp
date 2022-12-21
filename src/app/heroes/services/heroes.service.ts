import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collectionData, Firestore, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Heroe } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';

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
        window.alert('No existe');
        return;
      }
    });
    return datosHeroe;
  }

  agregarHeroe(heroe: Heroe){
    return setDoc(doc(this.firestore, "heroes", heroe.superhero), {
      id: heroe.superhero,
      superhero: heroe.superhero,
      alter_ego: heroe.alter_ego,
      characters: heroe.characters,
      first_appearance: heroe.first_appearance,
      publisher: heroe.publisher
    });
  }

}
