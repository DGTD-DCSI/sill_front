import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { UserComponent } from './components/settings/user/user.component';
import { ChipModule } from 'primeng/chip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { GroupeThematiqueComponent } from './components/settings/groupe-thematique/groupe-thematique.component';
import { LogicielComponent } from './components/settings/logiciel/logiciel.component';
import { CategorieComponent } from './components/settings/categorie/categorie.component';
import { TabViewModule } from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    LogicielComponent,
    CategorieComponent,
    GroupeThematiqueComponent,
    LogicielComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    StyleClassModule,
    PanelMenuModule,
    ButtonModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    ChipModule,
    InputSwitchModule,
    MultiSelectModule,
    TabViewModule,
    ToggleButtonModule,
    CalendarModule,

    RouterModule.forChild([
      { path: '', component: DashboardComponent },
      { path: 'settings/users', component: UserComponent },
      { path: 'settings/groupes-thematiques', component: GroupeThematiqueComponent },
      { path: 'settings/logiciels', component: LogicielComponent },
      { path: 'settings/categories', component: CategorieComponent },
    ])
  ]
})
export class PrivateModule { }
