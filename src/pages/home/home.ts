import { Component } from '@angular/core';
import  { ANIMALES } from '../../data/data.animales';
import { animal } from "../../interfaces/animal.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

animales: animal[] = [];

  constructor() {

    this.animales = ANIMALES.splice(0);

  }

  reproducir(animal:animal){

    console.log (animal);

    let audio = new Audio();
    audio.src = animal.audio;

    audio.load();
    audio.play();

    animal.reproduciendo = true;

    setTimeout( ()=> animal.reproduciendo = false, animal.duracion*1000);

  }

}
