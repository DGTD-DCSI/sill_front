import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { ApplicationService } from '../../../services/application/apllication.service';
import { Logiciel } from 'src/app/models/logiciel';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from 'src/app/models/categorie';
import { EditeurService } from '../../../services/editeur/editeur.service';
import { Editeur } from 'src/app/models/editeur';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  logiciels!: Logiciel[];
  logiciel: Logiciel = {};
  enableCreate = true;
  enableBtnInfo = true;
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;
  categories!: Categorie[];
  selectedCategory!: Categorie;
  editeurs!: Editeur[];
  selectedEditeur!: Editeur;


  constructor(
    private applicationService:ApplicationService,
    private categorieService:CategorieService,
    private editeurService:EditeurService,
    private confirmationService: ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this.load();
    this.loadCategorie();
    this.loadEditeur();
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.applicationService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.logiciels = response.logiciels;
      console.log(this.logiciels);
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }

  loadCategorie(event?: LazyLoadEvent) {
   this.categorieService.getAll(event).subscribe(response => {
     this.categories = response.categories;
     console.log(this.categories);
   }, error => {
     this.message = { severity: 'error', summary: error.error };
     console.error(JSON.stringify(error));
   });
 }


 loadEditeur(event?: LazyLoadEvent) {
 this.editeurService.getAll(event).subscribe(response => {
   this.editeurs = response.editeurs;
   console.log(this.logiciels);
 }, error => {
   this.message = { severity: 'error', summary: error.error };
   console.error(JSON.stringify(error));
 });
}

  //Détail
  onInfo(selection:any){
    console.log(selection);
    /* localStorage.removeItem("category");
    localStorage.setItem("category",JSON.stringify(selection));
    this.router.navigate(['/admin/sous-category']); */
  }

  save() {
    if (this.logiciel.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.logiciel = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.applicationService.create(this.logiciel).subscribe(response => {
      if (this.logiciels.length !== this.recordsPerPage) {
        this.logiciels.push(response);
        this.logiciels = this.logiciels.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Logiciel créé avec succes' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
     console.log(selection);
    this.logiciel = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.applicationService.update(this.logiciel).subscribe(response => {
      let index = this.logiciels.findIndex(logiciel => logiciel.id === response.id);
      this.logiciels[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Logiciel modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.logiciel.id;
  }


  // Deletion
  onDelete(selection:any) {
    this.confirmationService.confirm({
      message: 'Etes-vous sur de vouloir supprimer ?',
      accept: () => {
        this.delete(selection);
      }
    });
  }

  delete(selection:any) {
    console.log(selection.id);
    this.isOpInProgress = true;  
    this.applicationService.delete(selection.id).subscribe(() => {
      this.logiciels = this.logiciels.filter(logiciel => logiciel.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Logiciel supprimé avec succès' });
    }, error => {
      console.error(JSON.stringify(error));
      this.isOpInProgress = false;
      this.showMessage({ severity: 'error', summary: error.error.message });
    });
  }

  // Errors
  handleError(error: HttpErrorResponse) {
    console.error(`Processing Error: ${JSON.stringify(error)}`);
    this.isDialogOpInProgress = false;
    this.dialogErrorMessage = error.error.message;
  }

  // Messages
  clearDialogMessages() {
    this.dialogErrorMessage = null;
  }

  showMessage(message: Message) {
    this.message = message;
    this.timeoutHandle = setTimeout(() => {
      this.message = null;
    }, 5000);
  }
}
