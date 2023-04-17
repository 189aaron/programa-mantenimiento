import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentServiceService {

  path = 'http://127.0.0.1:8000/';

  constructor(
    private router: Router,
    private loginService: AuthServiceService,
    private http: HttpClient) { }

  add_equipment(group_no: string, name: string, location: string, part_ship: string, trademark: string, model: string, type: string, ship: string, serial_number: string, power: string, calibration_date: string, observations: string, department_or_base: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      })
    };
    
    const body = {
      'group_no': group_no,
      'name': name,
      'location': location,
      'part_ship': part_ship,
      'trademark': trademark,
      'model': model,
      'type': type,
      'ship': ship,
      'serial_number': serial_number,
      'power': power,
      'calibration_date': calibration_date,
      'observations': observations,
      'department_or_base': department_or_base
    };

    return this.http.post(this.path + 'equipment/', body, httpOptions).subscribe({
      next: (response: any) => {
        alert('Equipo registrado correctamente');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid'){
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        }else if (error.status == '400') {
          alert(JSON.stringify(error.error, null, 2));
        } else if (error.status == '401'){
          alert(error.error.detail);
          this.router.navigate(['/home']);
        } else if (error.status == '500'){
          alert('Error del servidor');
        }
        
      }
    });

  }

}
