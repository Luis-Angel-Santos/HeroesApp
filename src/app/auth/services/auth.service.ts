import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, setDoc, updateDoc} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../interfaces/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: User | undefined;

  constructor(private firestore: Firestore,
              private router: Router) { }

  get auth(): User{
    return { ...this._auth! }
  }

  async login(email: string){
    var datosUser = await getDoc(doc(this.firestore, 'usuarios', email))
      .then(user => {
        if(user.exists()){
          const datosUser: User = {
            id: user.data()['id'],
            email: user.data()['email'],
            usuario: user.data()['usuario']
          }
          localStorage.setItem('user', datosUser.email);
          this.router.navigate(['./heroes'])  
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
  
  logout(){
    this._auth = undefined;
    localStorage.removeItem('user');
  }

  verificarSesion():Observable<boolean>{
    var emailUser = localStorage.getItem('user');
    if( !emailUser ){
      return of(false);
    }
    getDoc(doc(this.firestore, 'usuarios', emailUser))
      .then(user => {
        if(user.exists()){
          const datosUser: User = {
            id: user.data()['id'],
            email: user.data()['email'],
            usuario: user.data()['usuario']
          }
          this._auth = datosUser;
          return datosUser;
        }else{
          return;
        }
      });
    return of(true);
  }

  async crearUsuario(nombre: string, correo: string){
    await setDoc(doc(this.firestore, 'usuarios', correo), {
      id: correo,
      usuario: nombre,
      email: correo
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Cuenta Creada',
        text: `Se ha creado correctamente la cuenta de ${nombre}`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => this.router.navigate(['/auth']))
    });
  }

}
