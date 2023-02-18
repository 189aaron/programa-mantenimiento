import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import { EquipmentServiceService } from 'src/app/services/equipment-service.service';

@Component({
  selector: 'app-registrar-equipo',
  templateUrl: './registrar-equipo.component.html'
})
export class RegistrarEquipoComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: AuthServiceService,
    private equipmentService: EquipmentServiceService) { }

  ngOnInit(): void {
    let session = localStorage.getItem('id_token');
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    }
  }

  add_equipment(form: NgForm) {
    const unam_number = form.value.unam_number;
    const name = form.value.name;
    const location = form.value.location;
    const part_ship = form.value.part_ship;
    const trademark = form.value.trademark;
    const model = form.value.model;
    const type = form.value.type;
    const serial_number = form.value.serial_number;
    const power = form.value.power;
    const calibration_date_date = form.value.calibration_date_date;
    const calibration_date_time = form.value.calibration_date_time;
    const observations = form.value.observations;
    
    this.equipmentService.add_equipment(unam_number, name, location, part_ship, trademark, model, type, serial_number, power, calibration_date_date + 'T' + calibration_date_time, observations);
  }

}
