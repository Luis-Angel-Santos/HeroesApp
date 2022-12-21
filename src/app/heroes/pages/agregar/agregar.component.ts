import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{

  idExists: string = 'Agregar Héroe';
  idHeroe: string = '';
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }
    if(this.heroe.id){
      this.heroesService.editarHeroe(this.heroe);
    }else{
      this.heroesService.agregarHeroe(this.heroe);
    }
  }

  ngOnInit(): void { 
    this.activatedRoute.params
      .subscribe(({id}) => this.idHeroe = id!);
    this.heroesService.getHeroePorId(this.idHeroe)
      .then((heroe) => {
        this.heroe = heroe!;
        this.idExists = 'Editar Héroe';
      })
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute){}

}
