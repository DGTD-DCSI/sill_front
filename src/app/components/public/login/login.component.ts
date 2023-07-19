import { Component, OnInit } from '@angular/core';

import { StorageService } from '../../../services/storage/storage.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  erreur: number= 0;

  user = new User();


  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      console.log(this.user);
      let isValidUser: Boolean = this.authService.SignIn(this.user);
      if (isValidUser)
          this.router.navigate(['/admin']);
      else
         //   alert('Login ou mot de passe incorrecte!');
         this.erreur=1;

    }
    logiciel(){
      this.router.navigate(['logiciels']);
    }
    
    login(){
      this.router.navigate(['login']);
      
    }
    categorie(){
      this.router.navigate(['accueil']);
      
    }
  
}