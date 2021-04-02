import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas:Pelicula[];
  @Output() cargarMas = new EventEmitter();

  @ViewChild('slidesPar') ionSlides:IonSlides;

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -24
  };


  constructor( private modalCtrl:ModalController) { }

  ngOnInit() {}

  onChange () {
    this.cargarMas.emit();
  }

  

  async verDetalle(id:string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
