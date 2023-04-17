import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SparepartServiceService } from 'src/app/services/sparepart-service.service';

@Component({
  selector: 'app-consulta-refaccion',
  templateUrl: './consulta-refaccion.component.html'
})
export class ConsultaRefaccionComponent implements OnInit {

  path = 'http://127.0.0.1:8000/';
  userAdministrador: boolean = false;//Solo para administradores
  superUsuario: boolean = false;//exclusivo superUsuario, no admins

  conData: string = '';
  whit_data: boolean = false;
  sparepart_array: any[] = [];
  serial_number = '';
  vistaPrincipal: boolean = false;

  constructor(
    private router: Router,
    private loginService: AuthServiceService,
    private sparepartService: SparepartServiceService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    let session = this.loginService.getIdToken;
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    } else {
      this.serial_number = this.route.snapshot.queryParams['serial_number'];
      this.get_sparepart(this.serial_number);
    }
    let superAdmin = localStorage.getItem('position');
    if (superAdmin == 'SUPERUSUARIO') {
      this.superUsuario = true;
    } else if (superAdmin == 'CAPITAN' || superAdmin == 'JEFE DE MAQUINAS') {
      this.userAdministrador = true;
    }
  }

  async get_sparepart(serial_number: string) {
    console.log(this.serial_number);
    let httpOptions: any;

    if (this.serial_number == null || this.serial_number == undefined) {
      this.path = this.path + 'spare_parts/'
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        })
      };
      this.vistaPrincipal = true;//para pintar columna del navio al que pertenece
    } else {
      this.path = this.path + 'spare_parts_list/'
      httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('id_token')
        }),
        params: {
          'serial_number': serial_number,
        }
      };
    }

    console.log(this.path);
    console.log(httpOptions);

    this.http.get(this.path, httpOptions).subscribe({
      next: (response: any) => {
        this.get_list_sparepart(response);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        } else if (error.status == '400') {
          alert(error.error.detail);
        }
      }
    })
  }

  get_list_sparepart(data: any) {
    //veo si tengo que mostrar
    if (data.length != 0) {
      //si tiene data
      this.whit_data = true;
      this.sparepart_array = data;
    } else {
      //no trae data
      this.conData =
        `<h3 class="text-center pt-3">
          Aun no tenemos datos que mostrarte
        </h3>`;
      this.whit_data = false;
    }
  }

  updateSparePart(sparepart: any) {
    window.location.href =
      '#/refacciones/editar-refaccion?serial_number=' + sparepart.equipment_id.serial_number +
      '&equipment_id=' + sparepart.equipment_id +
      '&amount=' + sparepart.amount +
      '&description=' + sparepart.description +
      '&position=' + sparepart.position +
      '&num_part=' + sparepart.num_part +
      '&num_ref=' + sparepart.num_ref +
      '&lamina=' + sparepart.lamina +
      '&item=' + sparepart.item +
      '&diagram=' + sparepart.diagram +
      '&plano=' + sparepart.plano +
      '&model=' + sparepart.model +
      '&observations=' + sparepart.observations +
      '&id=' + sparepart.id;
  }

  async deleteSparePart(sparepart: any) {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }),
      params: {
        'id': sparepart.id,
      },
      body: {
        "serial_number": sparepart.equipment_id.serial_number
      }
    };

    this.http.delete(this.loginService.path + 'configure_spareparts/', httpOptions).subscribe({
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
