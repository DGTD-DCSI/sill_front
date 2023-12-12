import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoginRequest } from 'src/app/pages/shared/models/login.request.model';
import { User } from 'src/app/pages/shared/models/user.model';
import { AuthService } from 'src/app/pages/shared/service/auth.service';
import { TokenStorageService } from 'src/app/pages/shared/service/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    password!: string;

    loginRequest: LoginRequest;
    user: User;
    loginHasError: boolean;
    loginError: string;

    constructor( public layoutService: LayoutService, private authService: AuthService, private router: Router, private tokenStorageService: TokenStorageService ) { }

    ngOnInit(): void {
        this.clearLoginRequest();
        this.loginHasError = false;
    }

    public handleLogin() {
        this.authService.login( this.loginRequest ).subscribe( data => {

            if( data.code == 200 ){
                this.user = data.result;
                this.tokenStorageService.saveUser( this.user );
                this.tokenStorageService.saveToken( this.user.token );
                this.router.navigateByUrl('/private');
                this.clearLoginRequest();
            } else {
                this.loginHasError = true;
                this.loginError = data.message;
                this.loginRequest.password = '';
                this.tokenStorageService.clearStorage();
            }
        })
    }

    private clearLoginRequest() {
        this.loginRequest = {} as LoginRequest;
    }

    getInputClass() {
        return {

        }
    } 
}
