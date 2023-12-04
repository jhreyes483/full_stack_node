// Importar los modulos del router
import { Routes } from '@angular/router';

// Importar componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

// Array de rutas
export const routes: Routes = [
    {
        path : 'login',
        component: LoginComponent
    },
    {
        path : 'registro',
        component: RegisterComponent
    },
    {
        path : 'inicio',
        component: HomeComponent
    },
    {
        path : 'ajustes',
        component: UserEditComponent
    },


    {
        path : '**',
        component: LoginComponent
    },
];

// Exportar configuración
//export const appRoutingProviders: any[] = [];
//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);