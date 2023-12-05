import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

/** importacion de modulo independiente */
import { PanelModule } from './modules/panel/panel.module';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user/user.service';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    RouterModule.forRoot(routes),
    PanelModule

  ],
  providers: [
    FormsModule,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
