import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  valor:string = '';
  buscando = false;
  peliculas:Pelicula[] = [];
  ideas:string[] = [];

  constructor(
    private moviesService:MoviesService,
    private modalCtrl:ModalController) {}


  buscar (event) {
    this.valor = event.detail.value;

    if (this.valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;
    this.moviesService.buscarPeliculas(this.valor)
        .subscribe( resp => {
          this.peliculas = resp['results'];
          this.buscando = false;
        });
  }

  
  async verDetalle(id:string) {
    this.ideas.unshift(this.valor);
    this.ideas.splice(10, 1);

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }


}
