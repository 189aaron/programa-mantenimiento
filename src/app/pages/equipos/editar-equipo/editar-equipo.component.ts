import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-editar-equipo',
  templateUrl: './editar-equipo.component.html'
})
export class EditarEquipoComponent implements OnInit {
  pSU: boolean = false;
  serial_number = '';
  group_no = '';
  name = '';
  location = '';
  part_ship = '';
  ship = '';
  department_or_base = '';
  trademark = '';
  model = '';
  type = '';
  power = '';
  calibration_date = '';// el valor que leo/recibo
  calibration_date_send = '';// el valor que envio
  calibration_date_date = '';
  calibration_date_time = '';
  observations = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: AuthServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Obtiene el valor del parámetro de consulta "serial_number"  
    this.serial_number = this.route.snapshot.queryParams['serial_number'];
    this.group_no = this.route.snapshot.queryParams['group_no'];
    this.name = this.route.snapshot.queryParams['name'];
    this.location = this.route.snapshot.queryParams['location'];
    this.part_ship = this.route.snapshot.queryParams['part_ship'];
    this.ship = this.route.snapshot.queryParams['ship'];
    this.department_or_base = this.route.snapshot.queryParams['department_or_base'];
    this.trademark = this.route.snapshot.queryParams['trademark'];
    this.model = this.route.snapshot.queryParams['model'];
    this.type = this.route.snapshot.queryParams['type'];
    this.power = this.route.snapshot.queryParams['power'];
    this.calibration_date = this.route.snapshot.queryParams['calibration_date'];
    this.observations = this.route.snapshot.queryParams['observations'];
    
    //Extraigo los valores de fecha y hora para setear en los input
    let cadena = this.calibration_date;
    let partes = cadena.split(" ");

    this.calibration_date_date = partes[0];
    this.calibration_date_time = partes[1];

    let superAdmin = localStorage.getItem('position');
      if (superAdmin == 'SUPERUSUARIO') {
        this.pSU = true;
      } 
  }

  async updateEquipment(form: NgForm) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }),
      params: {
        'serial_number': this.serial_number,
      }
    };

    console.log(form.value.calibration_date_date )
    console.log(form.value.calibration_date_time )
    if (form.value.calibration_date_date == null || form.value.calibration_date_time == undefined || form.value.calibration_date_date == '' || form.value.calibration_date_time == ''){
      this.calibration_date_send = '1900-01-01T00:00'; //para no enviar vacio al backend
    }else{
      this.calibration_date_send = form.value.calibration_date_date + 'T' + form.value.calibration_date_time;
    }

    const body = {
      'group_no': form.value.group_no,
      'name': form.value.name,
      'location': form.value.location,
      'part_ship': form.value.part_ship,
      'ship': form.value.ship,
      'department_or_base': form.value.department_or_base,
      'trademark': form.value.trademark,
      'model': form.value.model,
      'type': form.value.type,
      'power': form.value.power,
      'serial_number': form.value.serial_number,
      'calibration_date': this.calibration_date_send,
      'observations': form.value.observations
    };

    this.http.put(this.loginService.path + 'configure_equipments/?serial_number=' + this.serial_number, body, httpOptions).subscribe({
      next: (response: any) => {
        //TODO: regresar al inicio
        alert('Equipo actualizado con éxito');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        } else if (error.status == '400') {
          alert(error.error.detail);
        } else if (error.status == '404') {
          alert('Usuario no encontrado');
        } else if (error.status == '500') {
          alert('Error del servidor');
        }
      }
    })

  }

}
