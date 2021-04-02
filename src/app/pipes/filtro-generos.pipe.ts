import { Pipe, PipeTransform } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Pipe({
  name: 'filtroGeneros'
})
export class FiltroGenerosPipe implements PipeTransform {

  transform(peliculas:any[]): any[] {

    return peliculas.filter(peli => {
      return peli.peliculas.length > 0;
    })
  }

}
