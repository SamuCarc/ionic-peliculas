import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss'],
})
export class PostersComponent implements OnInit {

  @Input() peliculas:Pelicula[];
  @Output() detalleCerrado = new EventEmitter();

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  async verDetalle(id:string) {
    const modal = await this.modalCtrl.create({
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
