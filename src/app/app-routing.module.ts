import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarEquipoComponent } from './pages/equipos/registrar-equipo/registrar-equipo.component';
import { ConsutarEquipoComponent } from './pages/equipos/consutar-equipo/consutar-equipo.component';
import { ListarUsuariosComponent } from './pages/usuario/listar-usuarios/listar-usuarios.component';
import { RefreshTokenComponent } from './pages/usuario/refresh-token/refresh-token.component';
import { ActualizarUsuarioComponent } from './pages/usuario/actualizar-usuario/actualizar-usuario.component';
import { EliminarUsuarioComponent } from './pages/usuario/eliminar-usuario/eliminar-usuario.component';
import { EditarEquipoComponent } from './pages/equipos/editar-equipo/editar-equipo.component';
import { ConsultaRefaccionComponent } from './pages/refacciones/consulta-refaccion/consulta-refaccion.component';
import { EditarRefaccionComponent } from './pages/refacciones/editar-refaccion/editar-refaccion.component';
import { RegistarRefaccionComponent } from './pages/refacciones/registar-refaccion/registar-refaccion.component';
import { ContraseniaComponent } from './pages/contrasenia/contrasenia.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: UsuarioComponent },
  { path: 'usuarios/consultar', component: ListarUsuariosComponent },
  { path: 'usuarios/editar-usuario', component: ActualizarUsuarioComponent},
  { path: 'usuarios/eliminar', component: EliminarUsuarioComponent},
  { path: 'usuarios/restablecer_contraseña', component: ContraseniaComponent},
  { path: 'usuarios/renviar_token', component: RefreshTokenComponent },
  { path: 'equipos/registrar', component: RegistrarEquipoComponent },
  { path: 'equipos/consultar', component: ConsutarEquipoComponent },
  { path: 'equipos/editar-equipo', component: EditarEquipoComponent },
  { path: 'refacciones/registrar', component: RegistarRefaccionComponent},
  { path: 'refacciones/consultar', component: ConsultaRefaccionComponent},
  { path: 'refacciones/editar-refaccion', component: EditarRefaccionComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }