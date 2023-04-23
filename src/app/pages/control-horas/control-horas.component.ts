import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-control-horas',
  templateUrl: './control-horas.component.html'
})
export class ControlHorasComponent implements OnInit {
  // Define properties to hold the table data
  equipmentData: any[] = [
    { description: 'ESCOTILLA CBTA. INTEMPERIE', previousData: 1509, currentData: 1512 },
    { description: 'PLATAFORMA HIDROGRAFICA', previousData: 109, currentData: 112 },
    { description: 'MARCO "A" HIDROGRAFICO', previousData: 150, currentData: 152 }
  ];
  mes: string = 'Abril';

  erorHoras: string = '';
  intentoButton: number = 1;
  descriptionO: string = '';
  previousDataO: string = '';
  currentDataO: string = '';

  constructor() {
  }

  ngOnInit() {
  }


  getEquipment(equipo: any, event: Event) {
    this.erorHoras = '';
    this.intentoButton = 1;

    event.preventDefault();

    this.descriptionO = equipo.description;
    this.previousDataO = equipo.previousData;
    this.currentDataO = equipo.currentData;
  }

  addHours(equipo: NgForm, event: Event) {
    
    if(this.intentoButton == 1){
      if (equipo.value.anadirHoras == 0) {
        this.erorHoras = '<p class="text-danger">Debe ingresar un valor</p>';
      } else if (equipo.value.anadirHoras < 0) {
        this.erorHoras = '<p class="text-danger">El ingreso de horas no puede ser negativo</p>';
      } else if (equipo.value.anadirHoras > 0) {
        const obj = this.equipmentData.find(item => item.description === this.descriptionO);
        if (obj) {
          obj.currentData = obj.currentData + equipo.value.anadirHoras;
          this.erorHoras = '<p class="text-success">Horas ingresadas correctamente, puede cerrar la pestaña</p>';
          this.intentoButton = this.intentoButton - 1;
        }else {
          alert('ha ocurrido un error, por favor contacta al administrador');
        }
      } 
    }else{
      alert('Solo puede agregar el valor 1 vez por intento');
    }
    

  }

}
