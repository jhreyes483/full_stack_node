// Modulos
/* archivo se debe crear manualmente */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PanelRoutingModule } from "./panel.route";

// componentes
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';

// Servicios 


// NgModule()
@NgModule({
    declarations : [ /* Estos son los componentes creados*/
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    imports: [  /* Librerias internas de angular que se requieren */
        CommonModule,
        FormsModule,
        HttpClientModule,
        PanelRoutingModule 
    ],
    exports: [   /* Aca se exportan los componentes para que se puedan utilizar */
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    providers: []
})
export class PanelModule {}
