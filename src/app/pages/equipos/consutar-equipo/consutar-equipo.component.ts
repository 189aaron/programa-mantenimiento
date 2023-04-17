import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-consutar-equipo',
  templateUrl: './consutar-equipo.component.html'
})
export class ConsutarEquipoComponent implements OnInit {
  //TODO agregar el campo Navio al que pertenece en la vista para el SU
  path = 'http://127.0.0.1:8000/';
  userAdministrador: boolean = false;//Solo para administradores
  superUsuario: boolean = false;//exclusivo superUsuario, no admins

  conData: string = '';
  whit_data: boolean = false;
  equipment_array: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: AuthServiceService) { }

  ngOnInit(): void {
    let session = this.loginService.getIdToken();
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    } else {
      let superAdmin = localStorage.getItem('position');
      if (superAdmin == 'SUPERUSUARIO') {
        this.superUsuario = true;
      } else if (superAdmin == 'CAPITAN' || superAdmin == 'JEFE DE MAQUINAS') {
        this.userAdministrador = true;
      }
      this.get_equipment();
    }

  }

  async get_equipment() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      })
    };

    this.http.get(this.path + 'equipment/', httpOptions).subscribe({
      next: (response: any) => {
        this.get_list_equiptment(response);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        } else if (error.status == '400') {
          alert(error.error.detail);
        }else {
//          TODO ver el error 404 not found
          alert(error.error.detail);
        }
      }
    })
  }

  get_list_equiptment(data: any) {
    //veo si tengo que mostrar
    if (data.length != 0) {
      //si tiene data
      this.whit_data = true;
      this.equipment_array = data;
    } else {
      //no trae data
      this.conData =
        `<h3 class="text-center py-3">
          Aun no tenemos datos que mostrarte <br>
          ¿Deseas registrar un equipo? <br> 
          Haz click en el siguiente enlace<br>
          <a href="#/equipos/registrar">Registrar un equipo</a>
        </h3>`;
      this.whit_data = false;
    }
  }

  addSparePart(equipo: any){
    window.location.href = 
      '#/refacciones/registrar?serial_number=' + equipo.serial_number +
      '&equipment_id=' + equipo.id;
  }

  updateEquipment(equipo: any) {
    window.location.href = 
      '#/equipos/editar-equipo?serial_number=' + equipo.serial_number +
      '&group_no=' + equipo.group_no +
      '&name=' + equipo.name+
      '&location=' + equipo.location+
      '&part_ship=' + equipo.part_ship+
      '&trademark=' + equipo.trademark+
      '&model=' + equipo.model+
      '&type=' + equipo.type+
      '&power=' + equipo.power+
      '&calibration_date=' + equipo.calibration_date+
      '&observations=' + equipo.observations+
      '&ship=' + equipo.ship+
      '&department_or_base=' + equipo.department_or_base;
  }

  getSparePart(equipo: any){
    window.location.href = 
      '#/refacciones/consultar?serial_number=' + equipo.serial_number;
  }

  async deleteEquipment(equipo: any) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }),
      params: {
        'serial_number': equipo.serial_number,
      }
    };

    this.http.delete(this.loginService.path + 'configure_equipments/', httpOptions).subscribe({
      next: () => {
        //implementar exito
        alert('Equipo borrado con Exito\n Volverá a la pantalla inicial');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        } else {
          alert(error.error.detail);
        }
      }
    })

  }
}
