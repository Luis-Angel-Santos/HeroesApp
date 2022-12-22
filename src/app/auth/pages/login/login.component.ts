import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router,
              private authService: AuthService){}

  usuario: User = {
    id: '',
    email: '',
    usuario: '',
  }
  
  login(){
    this.authService.login(this.usuario.email);
  }
}
