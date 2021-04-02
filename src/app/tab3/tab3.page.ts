import { Component, OnInit, ViewChild } from '@angular/core';
import { PeliculaDetalle, Genre, FavoritoGenero } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  sliderOpts = {
    allowSlidePrev:false,
    allowSlideNext:false,
  }

  @ViewChild(IonSegment, {static:true}) segment:IonSegment;
  peliculas:PeliculaDetalle[] = [];
  generos:Genre[] = [];

  favoritoGeneroTodos:FavoritoGenero[] = [];
  favoritoGenero:FavoritoGenero[] = [{
    genero:'todas',
    peliculas: []
  }];


  constructor( private dataLocal:DataLocalService,
                private moviesService:MoviesService ) {}
  
  async ngOnInit() {
    this.segment.value = 'todas';
  }

  async ionViewWillEnter() {
    await this.cargarPeliculas();
    this.cargarGeneroSegmento(this.segment.value);
  }

  async onModalDetalleCerrado () {
    await this.cargarPeliculas();
    let peli = this.favoritoGeneroTodos.filter(pelicula=>{
      return pelicula.genero == this.segment.value;
    })
    if (peli[0].peliculas.length == 0 && this.segment.value != 'todas') {
      this.segment.value = 'todas';
    }
    this.cargarGeneroSegmento(this.segment.value);
  }

  cambioCategoria(ev) {
    this.cargarPeliculas();
    this.cargarGeneroSegmento(ev.detail.value);
  }

  cargarGeneroSegmento(gen:string) {
    this.favoritoGenero =  this.favoritoGeneroTodos.filter(peli =>{
      return peli.genero == gen;
    });
  }

  async cargarPeliculas () {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    this.peliculaPorGenero (this.generos, this.peliculas);
  }

  async peliculaPorGenero ( generos:Genre[], peliculas:PeliculaDetalle[]) {
    this.favoritoGeneroTodos = [];
    this.favoritoGeneroTodos.push({
      genero: 'todas',
      peliculas
    });
      
    generos.forEach(genero => {
      this.favoritoGeneroTodos.push({
        genero: genero.name,
        peliculas: peliculas.filter( peliculas => {
          return peliculas.genres.find(genre => genre.id == genero.id )
        })
      })
    });

  }
}
