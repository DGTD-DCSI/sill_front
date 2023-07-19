
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, LazyLoadEvent, MenuItem, Message } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { VersionService } from '../../../services/version/version.service';
import { Version } from 'src/app/models/version';
import { Router } from '@angular/router';
import { LogicielService } from 'src/app/services/logiciel/logiciel.service';
import { Logiciel } from 'src/app/models/logiciel';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment.recordsPerPage;
  versions!: Version[]
  version: Version= {};
  logiciels!: Logiciel[];
  selectedLogiciel!: Logiciel;
  enableCreate = true;
  enableBtnInfo = false;//bouton détail désactivé
  enableBtnEdit = true;
  enableBtnDelete = true;
  isLoading!: boolean;
  isOpInProgress!: boolean;
  isDialogOpInProgress!: boolean;
  showDialog = false;
  message: any;
  dialogErrorMessage: any;


  constructor(private versionService:VersionService,
    private logicielService:LogicielService,
    private confirmationService: ConfirmationService,
    
    private router : Router) { }

  ngOnInit(): void {
    this.load();
    this.loadLogiciel();
    
  }

  load(event?: LazyLoadEvent) {
     this.isLoading = true;
    this.versionService.getAll(event).subscribe(response => {
      this.isLoading = false;
      this.versions = response.versions;
    }, error => {
      this.message = { severity: 'error', summary: error.error };
      console.error(JSON.stringify(error));
    });
  }


  loadLogiciel(event?: LazyLoadEvent) {
    this.isLoading = true;
   this.logicielService.getAll(event).subscribe(response => {
     this.isLoading = false;
     this.logiciels = response.logiciels;
   }, error => {
     this.message = { severity: 'error', summary: error.error };
     console.error(JSON.stringify(error));
   });
 }


  //Détail
  onInfo(selection:any){
    /*localStorage.removeItem("editeur");
    localStorage.setItem("editeur",JSON.stringify(selection));
    this.router.navigate(['/admin/sous-category']);*/
  }

  save() {
    if (this.version.id) {
      this.edit();
    } else {
      this.create();
    }
  }


   //Creation
   onCreate() {
    this.version= {};
    this.clearDialogMessages();
    this.form.resetForm();
    this.showDialog = true;
  }


  create() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.versionService.create(this.version).subscribe(response => {
      if (this.versions.length !== this.recordsPerPage) {
        this.versions.push(response);
        this.versions= this.versions.slice();
      }
      this.totalRecords++;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'Version créé avec succès' });
    }, error => this.handleError(error));
  }


   // Edit
   onEdit(selection:any) {
     console.log(selection);
    this.version = Object.assign({}, selection);
    this.clearDialogMessages();
    this.showDialog = true;
  }

  edit() {
    this.clearDialogMessages();
    this.isDialogOpInProgress = true;
    this.versionService.update(this.version).subscribe(response => {
      let index = this.versions.findIndex(version => version.id === response.id);
      this.versions[index] = response;
      this.isDialogOpInProgress = false;
      this.showDialog = false;
      this.showMessage({ severity: 'success', summary: 'version modifié avec succès' });
    }, error => this.handleError(error));
  }

  isEditing() {
    return !!this.version.id;
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
    this.isOpInProgress = true;
    this.versionService.delete(selection.id).subscribe(() => {
      this.versions = this.versions.filter(version => version.id !== selection.id);
      selection = null;
      this.isOpInProgress = false;
      this.totalRecords--;
      this.showMessage({ severity: 'success', summary: 'Version supprimé avec succès' });
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
