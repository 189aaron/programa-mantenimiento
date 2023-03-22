import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html'
})
export class ActualizarUsuarioComponent implements OnInit {
  whit_data: boolean = false;
  equipment_array: any;
  conData: string = '';
  

  email_id:string = '';
  name:string = '';
  department_or_base:string = '';
  ship:string = '';
  position:string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: AuthServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.email_id = this.route.snapshot.queryParams['id'];
    this.name = this.route.snapshot.queryParams['name'];
    this.department_or_base = this.route.snapshot.queryParams['department_or_base'];
    this.ship = this.route.snapshot.queryParams['ship'];
    this.position = this.route.snapshot.queryParams['position'];
  }

  async updateUser(form: NgForm){
    console.log(form.value)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }),
      params: {
        'email': this.email_id,
      }
    };

    const body = {
      'name': form.value.name,
      'department_or_base': form.value.department_or_base,
      'ship': form.value.ship,
      'position': form.value.position
    };

    this.http.put(this.loginService.path + 'auth/configure_users/', body, httpOptions).subscribe({
      next: (response: any) => {
        alert('Usuario actulizado con exito');
        this.router.navigate(['/home']);
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
