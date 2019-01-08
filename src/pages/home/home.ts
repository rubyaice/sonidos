import { Component, animate } from '@angular/core';
import  { ANIMALES } from '../../data/data.animales';
import { animal } from "../../interfaces/animal.interface";
import { Refresher, reorderArray } from "ionic-angular";
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

animales: animal[] = [];
audio = new Audio();
audioTiempo: any;
ordenando:boolean = false; 

  constructor() {

    this.animales = ANIMALES.slice(0);

  }

  //FUNCION PARA REPRODUCIR EL AUDIO DE LOS ANIMALES

  reproducir(animal:animal){

    this.pausar_audio(animal);

    if (animal.reproduciendo) {

        animal.reproduciendo = false;
        return;
    }


    console.log (animal);

    
    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout( ()=> animal.reproduciendo = false, animal.duracion*1000);

  }

  //FUNCCION PAARA PAUSAR EL AUDIO

  private pausar_audio( animalSelect: animal ){

    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSelect.nombre) {
        
        animal.reproduciendo = false;

      }
      
    }
  }

  //FUNCION DE BORRADO RECIBIENDO EL NUMERO DE POSICION EN DONDE SE ENCUENTRA EL ANIMAL QUE SE DESEA BORRAR

  borrar_animal( idx:number ){

    this.animales.splice( idx, 1);

  }

  //FUNCION PARA REFRESCAR LA PAGINA LLAMANDO AL ARREGLO QUE INICIA LOS DATOS QUE OPTENEMOS DE LA DATA

  recargar_animales( refresher:Refresher ){

    console.log("inicio del refresher");

    setTimeout(()=>{

      console.log("termino el refresh");
      this.animales = ANIMALES.slice(0);

      refresher.complete();

    }, 1500);

  }

  reordenar_animales( incdices:any ){

    console.log(incdices);

    this.animales = reorderArray( this.animales, incdices );
    
  }

}
