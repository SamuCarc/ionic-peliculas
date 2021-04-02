import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas:Pelicula[];
  @Output() detalleCerrado = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -24
  };

  constructor( private modalCtrl:ModalController ) { }

  ngOnInit() {}

  async verDetalle(id:string) {
    let modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.onDidDismiss().then(res => {
      this.detalleCerrado.emit();
    });
     modal.present();

  }

}
