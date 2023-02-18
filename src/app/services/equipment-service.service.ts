import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentServiceService {

  path = 'http://127.0.0.1:8000/';

  constructor(
    private loginService: AuthServiceService,
    private http: HttpClient) { }

  add_equipment(unam_number: string, name: string, location: string, part_ship: string, trademark: string, model: string, type: string, serial_number: string, power: string, calibration_date: string, observations: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      })
    };

    const body = {
      'unam_number': unam_number,
      'name': name,
      'location': location,
      'part_ship': part_ship,
      'trademark': trademark,
      'model': model,
      'type': type,
      'serial_number': serial_number,
      'power': power,
      'calibration_date': calibration_date,
      'observations': observations
    };

    return this.http.post(this.path + 'equipment/', body, httpOptions).subscribe({
      next: (response: any) => {
        alert('Equipo registrado correctamente');
      },
      error: (error: any) => {
        console.log(error);
        if (error.error.code == 'token_not_valid'){
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.loginService.logout();
        }else if (error.status == '401') {
          alert(error.error.detail);
        } else {
          alert(JSON.stringify(error));
        }
        
      }
    });

  }

}
