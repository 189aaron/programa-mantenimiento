import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html'
})
export class ActualizarUsuarioComponent implements OnInit {
  whit_data: boolean = false;
  equipment_array: any;
  conData: string = '';

  constructor(
    private http: HttpClient,
    private loginService: AuthServiceService
  ) { }

  ngOnInit(): void {
  }

  async updateUser(form: NgForm){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      })
    };

    let body = {

    };

    this.http.put(this.loginService.path + 'auth/configure_users/', body, httpOptions).subscribe({
      next: (response: any) => {
        
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        }else if (error.status == '400') {
          alert(error.error.detail);
        } else if (error.status == '404') {
          alert('Usuario no encontrado');
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
      this.conData = `<h3 class="text-center py-5">Aun no tenemos datos que mostrarte <br> <a href="/register">Registrar un equipo</a></h3>`;
      this.whit_data = false;
    }
  }
}
