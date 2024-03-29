import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HoursServiceService {

  path = 'https://copo-unam.herokuapp.com/';

  constructor(
    private router: Router,
    private http: HttpClient) { }

  registerHours(current: string, month: string, year: string, equipment_id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
      }),
      params: {
        'equipment_id': equipment_id,
      }
    }

    const body = {
      "current": current,
      "month": month,
      "year": year
    };

    return this.http.post(this.path + 'hours_counter/', body, httpOptions).subscribe({
      next: () => {
        //alert('Horas registradas');
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.router.navigate(['/login']);
        } else if (error.status == '400') {
          alert('Ya existe el registro de este mes')
          //this.router.navigate(['/login']);
        } else if (error.status == '401') {
          alert(error.error.detail)
          this.router.navigate(['/login']);
        } else if (error.status == '404') {
          alert(error.error.detail)
          this.router.navigate(['/login']);
        } else {
          alert(JSON.stringify(error.error, null, 2));
        }

      }
    });




  }

}
