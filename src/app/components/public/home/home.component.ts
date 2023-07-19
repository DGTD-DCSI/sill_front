

import { filter } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Logiciel } from './../../../models/logiciel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from 'src/app/models/categorie';
import { LogicielService } from '../../../services/logiciel/logiciel.service';
import { ApplicationService } from 'src/app/services/application/apllication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Categorie[]=[];
  logiciels:Logiciel[]=[];
  
  message: any;
  isLoading!: boolean;
  IdCategorie! : number;
 

  constructor(private router : Router,
    private categorieService:CategorieService,private logicielService:LogicielService,
) { 
   
      this.loadLogiciel();
     this.load();
    };
 

 

// logiciels(){
  //  this.router.navigate(['/logiciels']);
  //}
  loadLogiciel(event?: LazyLoadEvent) {
    this.logicielService.getAll(event).subscribe(response => {
      this.logiciels = response.logiciels;
      console.log(this.logiciels);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  load(event?: LazyLoadEvent) {
    //this.isLoading = true;
   this.categorieService.getAll(event).subscribe(response => {
     //this.isLoading = false;
     this.categories = response.categories;
   }, error => {
     this.message = { severity: 'error', summary: error.error };
     console.error(JSON.stringify(error));
   });
 }
  ngOnInit(): void {

  
    
  }


  logiciel(){
    this.router.navigate(['logiciels']);
  }
  login(){
    this.router.navigate(['login']);
  }


  handleclick(event : any ,category : Categorie){
event.preventDefault()


 
  
  }
  
   
  


//console.log(category)

  }
 
