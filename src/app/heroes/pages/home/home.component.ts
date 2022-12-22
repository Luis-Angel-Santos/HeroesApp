import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private router: Router,
              private authService: AuthService){}
  
  get user(){
    return this.authService.auth;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['./auth']);
  }

}
