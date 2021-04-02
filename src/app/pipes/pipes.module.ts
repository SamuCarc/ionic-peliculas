import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroImagenPipe } from './filtro-imagen.pipe';
import { FiltroGenerosPipe } from './filtro-generos.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe,
    FiltroGenerosPipe
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltroImagenPipe,
    FiltroGenerosPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
