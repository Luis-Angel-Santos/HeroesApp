import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificarSesion()
        .pipe(
          tap(autenticado => {
            if(!autenticado){
              this.router.navigate(['./auth/login'])
                .then(resp => {
                  Swal.fire({
                    icon: 'error',
                    title: 'No tiene acceso',
                    text: 'Por favor inicie sesión',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false
                  });
                });
            }
          })
        );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificarSesion()
      .pipe(
        tap(autenticado => {
          if(!autenticado){
            this.router.navigate(['./auth/login'])
            .then(resp => {
              Swal.fire({
                icon: 'error',
                title: 'No tiene acceso',
                text: 'Por favor inicie sesión',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false
              });
            });
          }
        })
      );
  }
}
