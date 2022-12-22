import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private authService: AuthService){}
  
  usuario: string = '';
  email: string = '';

  crearUsuario(){
    if(this.usuario.length > 2 && this.email.length > 2){
      this.authService.crearUsuario(this.usuario, this.email);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Opps, parece que ocurrio un error',
        text: `Por favor revise los datos o intente de nuevo`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      })
    }
  }
}
