import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { collectionData, Firestore, collection, doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc } from '@angular/fire/firestore';
import { Heroe } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  placeRef = collection(this.firestore, 'heroes'); 

  constructor(private firestore: Firestore,
              private router: Router) { }

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
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No existe!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        })
        return;
      }
    });
    return datosHeroe;
  }

  async agregarHeroe(heroe: Heroe){
    const addHeroe = await addDoc(collection(this.firestore, 'heroes'), {
      superhero: heroe.superhero,
      alter_ego: heroe.alter_ego,
      characters: heroe.characters,
      first_appearance: heroe.first_appearance,
      publisher: heroe.publisher,
      alt_img: heroe.alt_img
    });
    return updateDoc(doc(this.firestore, 'heroes', addHeroe.id),{
      id: addHeroe.id
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Heroe Agregado',
        text: `Se ha agregado el h??roe ${heroe.superhero} correctamente`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => this.router.navigate(['/heroes/listado']))
    });
  }

  editarHeroe(heroe: Heroe){
    if(heroe.alt_img){
      return updateDoc(doc(this.firestore, 'heroes', `${heroe.id}`), {
        superhero: heroe.superhero,
        alter_ego: heroe.alter_ego,
        characters: heroe.characters,
        first_appearance: heroe.first_appearance,
        publisher: heroe.publisher,
        alt_img: heroe.alt_img
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Modificados',
          text: `Se ha modificado el h??roe ${heroe.superhero}`,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then((resp) => this.router.navigate(['/heroes/editar', heroe.id]))
      });
    }else{
      return updateDoc(doc(this.firestore, 'heroes', `${heroe.id}`), {
        superhero: heroe.superhero,
        alter_ego: heroe.alter_ego,
        characters: heroe.characters,
        first_appearance: heroe.first_appearance,
        publisher: heroe.publisher
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Modificados',
          text: `Se ha modificado el h??roe ${heroe.superhero}`,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then((resp) => this.router.navigate(['/heroes/editar', heroe.id]))
      });
    }
  }

  async eliminarHeroe(id: string){
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar H??roe',
      text: '??Esta seguro? Esta Acci??n no se puede revertir',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red',
      cancelButtonColor: 'yellow'
    }).then(async (resp) => {
      if(resp.isConfirmed){
        await deleteDoc(doc(this.firestore, 'heroes', id))
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'H??roe Eliminado',
              text: 'H??roe eliminado de forma correcta',
              showConfirmButton: true,
              confirmButtonColor: 'green',
              confirmButtonText: 'P??gina Principal'
            }).then(() => this.router.navigate(['/heroes']));
          });
      }
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Opps, hubo un problema',
        text: error.message,
        showConfirmButton: true,
        confirmButtonText: 'Reintentar'
      })
    }) 
  }

}
