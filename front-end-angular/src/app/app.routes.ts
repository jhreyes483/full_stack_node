// Importar los modulos del router
import { Routes } from '@angular/router';

// Importar componentes
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

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
        path : '**',
        component: LoginComponent
    },
];

// Exportar configuración
//export const appRoutingProviders: any[] = [];
//export const routing: ModuleWithProviders = RouterModule.forRoot(routes);