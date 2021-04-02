import { Injectable } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';

import { Storage } from '@ionic/storage'
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas:PeliculaDetalle[] = [];

  constructor( private storage:Storage,
                private toastCtrl:ToastController ) { 
                  this.cargarFavoritos();
                }


  guardarPelicula ( pelicula:PeliculaDetalle ) {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }
    
    if (existe) {
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Película eliminada de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Película añadida a favoritos'
    }
    this.storage.set('peliculas', this.peliculas);
    this.mensaje(mensaje);

    return !existe;
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true : false;
  }

  async mensaje(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position:'middle',
      cssClass: 'toast-mensaje' 
    });
    toast.present();
  }


}
