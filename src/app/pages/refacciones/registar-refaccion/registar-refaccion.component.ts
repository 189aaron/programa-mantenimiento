import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SparepartServiceService } from 'src/app/services/sparepart-service.service';

@Component({
  selector: 'app-registar-refaccion',
  templateUrl: './registar-refaccion.component.html'
})
export class RegistarRefaccionComponent implements OnInit {

  path = 'https://copo-unam.herokuapp.com/';
  userAdministrador: boolean = false;//Solo para administradores
  superUsuario: boolean = false;//exclusivo superUsuario, no admins

  conData: string = '';
  whit_data: boolean = false;
  sparepart_array: any[] = [];
  serial_number = '';
  equipment_id = '';

  constructor(
    private router: Router,
    private loginService: AuthServiceService,
    private sparepartService: SparepartServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let session = this.loginService.getIdToken;
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    } else {
      this.serial_number = this.route.snapshot.queryParams['serial_number'];
      this.equipment_id = this.route.snapshot.queryParams['equipment_id'];
    }
  }

  add_sparepart(form: NgForm) {
    const serial_number = this.serial_number;
    const equipment_id = this.equipment_id;
    const amount = form.value.amount;
    const description = form.value.description;
    const position = form.value.position;
    const num_part = form.value.num_part;
    let  num_ref = form.value.num_ref;
    if (num_ref == ''){
      num_ref = 0;
    }
    const sheet_diagram = form.value.sheet_diagram;
    let item = form.value.item;
    if (item == ''){
      item = 0;
    }
    const plano = form.value.plano;
    const model = form.value.model;
    const observations = form.value.observations;
    this.sparepartService.add_sparepart(serial_number, equipment_id, amount, description, position, num_part, num_ref, sheet_diagram, item, plano,model,observations);
  }


}
