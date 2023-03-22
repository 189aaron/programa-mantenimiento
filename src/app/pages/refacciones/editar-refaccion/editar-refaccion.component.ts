import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-editar-refaccion',
  templateUrl: './editar-refaccion.component.html'
})
export class EditarRefaccionComponent implements OnInit {

  serial_number = '';
  amount = '';
  description = '';
  position = '';
  num_part = '';
  num_ref = '';
  lamina = '';
  item = '';
  diagram = '';
  plano = '';
  model = '';
  observations = '';
  id = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: AuthServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtiene el valor de los parámetros 
    this.serial_number = this.route.snapshot.queryParams['serial_number'];
    this.amount = this.route.snapshot.queryParams['amount'];
    this.description = this.route.snapshot.queryParams['description'];
    this.position = this.route.snapshot.queryParams['position'];
    this.num_part = this.route.snapshot.queryParams['num_part'];
    this.num_ref = this.route.snapshot.queryParams['num_ref'];
    this.lamina = this.route.snapshot.queryParams['lamina'];
    this.item = this.route.snapshot.queryParams['item'];
    this.diagram = this.route.snapshot.queryParams['diagram'];
    this.plano = this.route.snapshot.queryParams['plano'];
    this.model = this.route.snapshot.queryParams['model'];
    this.observations = this.route.snapshot.queryParams['observations'];
    this.id = this.route.snapshot.queryParams['id'];
  }

  async update_sparepart(form: NgForm) {
    console.log(form.value)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      }),
      params: {
        'id': this.id,
      }
    };

    const body = {
      'serial_number': this.serial_number,
      'amount': form.value.amount,
      'description': form.value.description,
      'position': form.value.position,
      'num_part': form.value.num_part,
      'num_ref': form.value.num_ref,
      'lamina': form.value.lamina,
      'item': form.value.item,
      'diagram': form.value.diagram,
      'plano': form.value.plano,
      'model': form.value.model,
      'observations': form.value.observations
    };

    this.http.put(this.loginService.path + 'configure_spareparts/', body, httpOptions).subscribe({
      next: (response: any) => {
        //TODO: regresar al inicio
        alert('Refacción actulizada con exito');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        } else if (error.status == '400') {
          //TODO revisar porque falta algun campo
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
