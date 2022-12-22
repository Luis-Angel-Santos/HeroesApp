import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: User | undefined;

  constructor(private firestore: Firestore) { }

  get auth(): User{
    return { ...this._auth! }
  }

  async login(){
    var datosUser = await getDoc(doc(this.firestore, 'usuarios', '1'))
      .then(user => {
        if(user.exists()){
          const datosUser: User = {
            id: user.data()['id'],
            email: user.data()['email'],
            usuario: user.data()['usuario']
          }
          return datosUser;
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No existe ese usuario!',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
          })
          return;
        }
      });
    this._auth = datosUser;
    return datosUser;
  }
  
}
