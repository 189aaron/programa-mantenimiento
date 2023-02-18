import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  path = 'http://127.0.0.1:8000/';
  

  constructor(
    private router: Router, private http: HttpClient) { }

  login(email: string, password: string) {
    const body = {
      'email': email,
      'password': password
    };

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.path + 'auth/login/', body, httpOptions).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('position', response.position)
        localStorage.setItem('ship', response.ship)
        localStorage.setItem('id_token', response.tokens.access);
        if (localStorage.getItem('id_token') != "null") {
          this.router.navigate(['/home']);
        } else {
          alert('No se puede iniciar sesión, contacta al administrador');
        }
      },
      error: (error: any) => {
        if (error.status == '500') {
          alert(error.error);
        } else {
          alert(error.error.detail);
        }

      }
    });


  }

  refreshToken(email: string) {
    const body = {
      'email': email
    };

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(this.path + 'auth/refresh_token/', body, httpOptions).subscribe({
      next: (response: any) => {
        localStorage.setItem('id_token', response.tokens.access);
        if (localStorage.getItem('id_token') != "null") {
          this.router.navigate(['/home']);

        } else {
          alert('El correo no se ha registrado o el correo ya se activó');
        }
      },
      error: (error: any) => {
        if (error.status == '500') {
          alert(error.error);
        } else {
          alert(error.error.detail);
        }

      }
    });


  }

  getIdToken() {
    return localStorage.getItem('id_token')
  }


  logout() {
    localStorage.removeItem("id_token");
    return this.router.navigate(['/login']);
  }

  registerUser(name: string, email: string, password: string, department: string, ship: string, position: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('id_token')
      })
    };

    const body = {
      'name': name,
      'email': email,
      'password': password,
      'department_or_base': department,
      'ship': ship,
      'position': position
    };

    return this.http.post(this.path + 'auth/signup/', body, httpOptions).subscribe({
      next: () => {
        alert('usuario registrado');
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        if (error.error.code == 'token_not_valid') {
          alert('Caducó la sesión, por favor ingresa de nuevo');
          this.logout();
        }
        alert(JSON.stringify(error));
      }
    });




  }

}
