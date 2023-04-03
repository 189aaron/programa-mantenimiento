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

  pSU: boolean = false;

  constructor(
    private router: Router,
    private loginService: AuthServiceService,
    private equipmentService: EquipmentServiceService) { }

  ngOnInit(): void {
    let session = this.loginService.getIdToken;
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    }

    let pSU = localStorage.getItem('position');
    if (pSU == 'SUPERUSUARIO'){
      this.pSU = true;
    }else {
      this.pSU = false;
    }
  }

  add_equipment(form: NgForm) {
    let  calibration_date = '';
    const group_no = form.value.group_no;
    const name = form.value.name;
    const location = form.value.location;
    const part_ship = form.value.part_ship;
    const trademark = form.value.trademark;
    const model = form.value.model;
    const type = form.value.type;
    const ship = form.value.ship;//TODO agregar los campos del SuperUsuario
    const serial_number = form.value.serial_number;
    const power = form.value.power;
    const calibration_date_date = form.value.calibration_date_date;
    const calibration_date_time = form.value.calibration_date_time;
    const observations = form.value.observations;
    const department_or_base = form.value.department_or_base;
    
    if (calibration_date_date == '' || calibration_date_time == ''){
      calibration_date == '';
    }else{
      calibration_date = calibration_date_date + 'T' + calibration_date_time;
    }
    console.log(calibration_date)
    this.equipmentService.add_equipment(group_no, name, location, part_ship, trademark, model, type, ship, serial_number, power, calibration_date, observations, department_or_base);
  }

}
