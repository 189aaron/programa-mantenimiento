import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    PageNotFoundComponent,
    HomeComponent,
    RegistrarEquipoComponent,
    ConsutarEquipoComponent,
    ListarUsuariosComponent,
    RefreshTokenComponent,
    ActualizarUsuarioComponent,
    EliminarUsuarioComponent,
    EditarEquipoComponent,
    ConsultaRefaccionComponent,
    EditarRefaccionComponent,
    RegistarRefaccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
