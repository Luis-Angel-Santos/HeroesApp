import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {
    if(heroe.alt_img){
      return `${heroe.alt_img}`
    }else{
      return '../../../assets/no-image.png'
    }
  }

}
