import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula:PeliculaDetalle = {};
  actores:Cast[] = [];
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  oculto = 150;

  constructor( 
              private moviesService:MoviesService,
              private modalCtr:ModalController,
              private dataLocal:DataLocalService) { }

  ngOnInit() {
    this.dataLocal.existePelicula(this.id)
          .then( existe => this.estrella = (existe) ? 'star' : 'star-outline');
  
    this.moviesService.getPeliculaDetalle(this.id)
          .subscribe ( resp => {
            this.pelicula = resp;
          });
  
    this.moviesService.getActoresPelicula(this.id)
          .subscribe ( resp => {
            this.actores = resp.cast;
          });
    
  }

  regresar() {
    this.modalCtr.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }
  

  
}
