import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html'
})
export class ListarUsuariosComponent implements OnInit {

  path = 'http://127.0.0.1:8000/';
  adminUser: boolean = false;//Solo para administradores

  conData: string = '';
  whit_data: boolean = false;
  users_array: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: AuthServiceService) { }

  ngOnInit(): void {
    let session = localStorage.getItem('position');
    if (session == null || session == undefined) {
      this.router.navigate(['/login']);
    }

  }

  async get_users() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      })
    };

    this.http.get(this.path + 'auth/list_users/', httpOptions).subscribe({
      next: (response: any) => {
        console.log(response);
        this.get_list_users(response);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        }else if (error.status == '400') {
          alert(error.error.detail);
        } else if (error.status == '403') {
          alert(error.error.detail);
        }
      }
    })
  }

  get_list_users(data: any) {
    //veo si tengo que mostrar
    if (data.length != 0) {
      //si tiene data
      this.whit_data = true;
      this.users_array = data;
    } else {
      //no trae data
      this.conData = `<h3 class="text-center py-5">Aun no tenemos datos que mostrarte <br> <a href="/register">Registrar un equipo</a></h3>`;
      this.whit_data = false;
    }
  }

  editarUsuario(usuario: any){
    console.log(usuario);
  }

  borrarUsuario(usuario: any){
    console.log(usuario);
  }

}
