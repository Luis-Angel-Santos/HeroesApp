import { Component, OnInit } from '@angular/core';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{

  app = initializeApp(environment.firebase);
  storage = getStorage(this.app);
  idExists: string = 'Editar Héroe';
  idHeroe: string = '';
  subirFoto!: boolean;
  fotoSubida: string = '';
  progreso: number = 0;
  file!: File;

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

  onFileSelect(event: any) {
    this.subirFoto = true;
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    var storageRef = ref(this.storage, this.file.name);
    var uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed', (snapshot) => {
      //Obteniedo progreso de subida
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.progreso = progress;
    },(error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    },() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        this.fotoSubida = downloadURL;
      });
    })
  };

  guardar(){
    this.heroe.alt_img = this.fotoSubida;
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

    if(!this.router.url.includes('editar')){
      this.idExists = 'Agregar Héroe';
      return;
    }
    this.activatedRoute.params
      .subscribe(({id}) => this.idHeroe = id!);
    this.heroesService.getHeroePorId(this.idHeroe)
      .then((heroe) => {
        this.heroe = heroe!;
      })
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router){}

}
