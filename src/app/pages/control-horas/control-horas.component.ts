import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { HoursServiceService } from 'src/app/services/hours-service.service';

@Component({
  selector: 'app-control-horas',
  templateUrl: './control-horas.component.html'
})
export class ControlHorasComponent implements OnInit {
  path = 'https://copo-unam.herokuapp.com/';

  userAdministrador: boolean = false;//Solo para administradores
  superUsuario: boolean = false;//exclusivo superUsuario, no admins
  ambosBuques: boolean = false;//exclusivo los que ven ambos buques

  //Para los errores de las consultas vacias
  conData: string = '';
  conDataList: string = '';
  erorHoras: string = '';

  //para listar los equipos que se tienen registrados
  whit_data: boolean = false;
  whit_dataHours: boolean = false;
  equipment_array: any[] = [];

  //para listar los equipos del mes de consulta
  hours_array: any[] = [];


  intentoButton: number = 1;//para los intentos del boton
  equipment_id: string = '';//para setear en el post
  equipmentName: string = '';//para mostrar nombre del equipo al que pertenece
  mesConsulta: string = '';//Para setear el mes de consulta
  anioConsulta: string = '';//Para setear el mes de consulta

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: AuthServiceService,
    private hoursService: HoursServiceService) { }

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
      this.get_equipment();//traigo los equipos
    }

    let ambosBuquesAux = localStorage.getItem('ship');
    if (ambosBuquesAux == 'AMBOS') {
      this.ambosBuques = true;
    }
  }

  //consulta de equipos
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
        } else {
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
      //console.log(this.userAdministrador)
      this.conData =
        `<h3 class="text-center py-3">
          Aun no tenemos datos que mostrarte
        </h3>
        `;
      this.whit_data = false;
    }
  }

  //para registrar horas a un determinado equipo
  async register_hour(form: NgForm) {
    if (this.intentoButton == 1) {
      //TODO: GET para llamar a la funcion
      const monthDate = form.value.month;

      let month = this.obtenerMes(monthDate);
      let yearAux = monthDate.split("-");

      let year = yearAux[0];

      console.log('0', month, year, this.equipment_id);
      const obj = await this.hoursService.registerHours('0', month, year, this.equipment_id);

      if (obj) {
        console.log(obj);
      } else {
        console.log(obj);
        alert('ha ocurrido un error, por favor contacta al administrador');
      }

    } else {
      alert('Solo puede agregar el valor 1 vez por intento');
    }


  }

  //setear valores al modal
  pasarDatos(equipo: any) {
    this.intentoButton = 1; // seteo el valor en 1 para el nuevo intento del boton
    this.equipmentName = '';
    this.equipment_id = '';

    this.equipmentName = equipo.name;
    this.equipment_id = equipo.id;
  }

  //Para detonar la consulta por mes
  list_hour(form: NgForm) {
    const monthDate = form.value.month;

    if (monthDate == '') {
      //No colocaron mes y año
      alert('Introduce un Mes y Año');
    } else {
      //Si traigo datos
      this.mesConsulta = this.obtenerMes(monthDate);
      let yearAux = monthDate.split("-");

      this.anioConsulta = yearAux[0];

      this.getHours(this.mesConsulta, this.anioConsulta);
    }
  }

  //para consultar equipos con horas de determinado mes
  getHours(month: string, year: string) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      }),
      params: {
        'month': month,
        'year': year
      }
    };

    return this.http.get(this.path + 'hours_counter/', httpOptions).subscribe({
      next: (response: any) => {
        this.conDataList = '';
        this.get_list_hours(response);
        //this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error(error.error);
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        } else if (error.status == '400') {
          alert(error.error);
        } else if (error.status == '403') {
          alert(error.error.detail);
          //this.router.navigate(['/login']);
        } else if (error.status == '404') {
          alert(error.error);
        } else {
          alert(error.error);
          this.router.navigate(['/login']);
        }


      }
    });

  }

  get_list_hours(data: any) {
    //veo si tengo que mostrar
    if (data.length != 0) {
      //si tiene data
      this.whit_dataHours = true;
      this.hours_array = data;
    } else {
      //no trae data
      this.conDataList =
        `<h3 class="text-center pt-3">
          No hay equipos con horas registradas en este mes
        </h3>`;
      this.whit_dataHours = false;
    }
  }

  obtenerMes(fechaString: string) {
    const fechaArray = fechaString.split("-");
    const mesNumero = parseInt(fechaArray[1]);

    let mesString = '';

    if (mesNumero == 1) {
      mesString = 'ENERO'
    } else if (mesNumero == 2) {
      mesString = 'FEBRERO'
    } else if (mesNumero == 3) {
      mesString = 'MARZO'
    } else if (mesNumero == 4) {
      mesString = 'ABRIL'
    } else if (mesNumero == 5) {
      mesString = 'MAYO'
    } else if (mesNumero == 6) {
      mesString = 'JUNIO'
    } else if (mesNumero == 7) {
      mesString = 'JULIO'
    } else if (mesNumero == 8) {
      mesString = 'AGOSTO'
    } else if (mesNumero == 9) {
      mesString = 'SEPTIEMBRE'
    } else if (mesNumero == 10) {
      mesString = 'OCTUBRE'
    } else if (mesNumero == 11) {
      mesString = 'NOVIEMBRE'
    } else if (mesNumero == 12) {
      mesString = 'DICIEMBRE'
    }

    return mesString;
  }

}
