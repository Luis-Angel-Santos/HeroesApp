import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {

  heroe!: Heroe;
  idHeroe: string = '';

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

  ngOnInit(): void {
    this.activatedRoute.params
      //.pipe(switchMap( ({id}) => this.heroesService.getHeroePorId(id)))
      .subscribe(({id}) => this.idHeroe = id!);
    this.heroesService.getHeroePorId(this.idHeroe)
      .then((heroe) => {
        this.heroe = heroe!;
      })
  }

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService,
              private router: Router){}
}
