import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";
import { doc, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { HeroesService } from '../../services/heroes.service';
import { getFirestore } from '@angular/fire/firestore';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{
  
  heroes!: Heroe[];

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  constructor(private heroesService: HeroesService){}

}
