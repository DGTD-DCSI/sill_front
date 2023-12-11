import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      RegisterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
          { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
          { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
          { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
          // { path: 'register',  component: RegisterComponent },
          { path: '**', redirectTo: '/notfound' }
        ])
    ],
})
export class AuthModule { }
