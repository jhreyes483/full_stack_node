import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// cargar componentes se traen de app modules principal una vez se crea por comando y se actualiza la ruta ya que cambia la carpeta
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';

const panelRoutes: Routes = [
    {
        path: 'panel',
        component: MainComponent,
        children: [
            { 
                path: '',
                component: ListComponent
            },
            { 
                path: 'crear',
                component: AddComponent
            },
            { 
                path: 'lsitado',
                component: ListComponent
            },
            { 
                path: 'editar/:id',
                component: EditComponent
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PanelRoutingModule {}