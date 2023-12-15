import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UserComponent } from './pages/private/components/settings/user/user.component';
import { AuthGuardGuard } from './auth-guard.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'private', component: AppLayoutComponent,
                canActivate: [AuthGuardGuard],
                children: [
                    { path: '', loadChildren: () => import('./pages/private/private.module').then(m => m.PrivateModule) },
                    // { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    // { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    // { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    // { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                ]
            },
            { path: '', loadChildren: () => import('./pages/public/public.module').then(m => m.PublicModule) },
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'auth', loadChildren: () => import('./pages/public/components/auth/auth.module').then(m => m.AuthModule) },
            // { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
