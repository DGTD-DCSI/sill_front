import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Categorie } from 'src/app/models/categorie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  categories!: Categorie[];
  categorie: Categorie = {};
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
  selectedCategory:any;


  constructor(private categorieService:CategorieService,
    private confirmationService: ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this.load();
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.categorieService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.categories = response.categories;
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

  //Détail
  onInfo(selection:any){
    localStorage.removeItem("categorie");
    localStorage.setItem("categorie",JSON.stringify(selection));
    this.router.navigate(['/admin/sous-categorie']);
  }

  save() {
    if (this.categorie.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.categorie = {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.categorieService.create(this.categorie).subscribe(response => {
      if (this.categories.length !== this.recordsPerPage) {
        this.categories.push(response);
        this.categories = this.categories.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Categorie créée avec succes' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
     console.log(selection);
    this.categorie = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.categorieService.update(this.categorie).subscribe(response => {
      let index = this.categories.findIndex(categorie => categorie.id === response.id);
      this.categories[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Catégorie modifiée avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.categorie.id;
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
    this.categorieService.delete(selection.id).subscribe(() => {
      this.categories = this.categories.filter(categorie => categorie.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Catégorie supprimée avec succès' });
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
