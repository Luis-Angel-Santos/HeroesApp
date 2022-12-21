import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{
  
  idHeroe: string = '';

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({id}) => this.idHeroe = id);
  
  }

  constructor(private activatedRoute: ActivatedRoute){}

}
