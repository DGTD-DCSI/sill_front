import { Component, OnInit, ViewChild } from '@angular/core';
import { EditeurService } from 'src/app/pages/shared/service/editeur.service';
import { MessageService } from 'primeng/api';
import { Editeur } from 'src/app/pages/shared/models/editeur.model';
import { Table } from 'primeng/table';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-editeur',
  templateUrl: './editeur.component.html',
  styleUrls: ['./editeur.component.scss'],
  providers: [MessageService],
})
export class EditeurComponent implements OnInit {

  @ViewChild('dtf') form!: NgForm;

  timeoutHandle: any;
  totalRecords!: number;
  recordsPerPage = environment;

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


  editeurs: Editeur[] = [];
  selectedEditeurs: Editeur[] = [];
  //cols = [];
  constructor( private messageService: MessageService, private editeurService: EditeurService) { }
  //editeur: Editeur[] = [];

  editeur: Editeur = {
    id: '',
    libelle: '',
    createdDate: '',
    lastUpdatedDate: '',
    url: '',
    deleted: true,
  };

  cols: any[] = [];


  submitted: boolean = false;

  deleteEditeurDialog: boolean = false;

 deleteeEditeursDialog: boolean = false;

  editeurDialog: boolean = false;
  ngOnInit(): void {
    this.editeurService.getAllEditeurs().subscribe((data) => {
      console.log("un")
        if( data.code == 200 ) {
          this.editeurs = data.result;
          console.log("deux")
          console.log(this.editeurs)
        }
        console.log("trois")
    });

    this.cols = [
      { field: 'libelle', header: 'Libellé' },
      { field: 'createdDate', header: 'Date de création' },
      { field: 'deleted', header: 'Est Supprimer' },
     { field: 'lastUpdatedDate', header: 'Date de la dernière mise à jour' },
      { field: 'url', header: 'URL' },
    ];


  }

  deleteSelectedProducts() {
    this.deleteEditeurDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  openNewEditeur() {
    this.editeur ={
      id: '',
      libelle: '',
      createdDate: '',
      lastUpdatedDate: '',
      url: '',
      deleted: true,
    };
    this.submitted = false;
    this.editeurDialog = true;
}

hideDialog() {
    this.editeurDialog = false;
    this.submitted = false;
}

saveEditeur() {
  this.submitted = true;

  if (this.editeur.libelle?.trim()) {
      if (this.editeur.id) {
          // @ts-ignore
          this.editeurs[this.findIndexById(this.editeur.id)] = this.editeur;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données Editeur mis-à-jour', life: 3000 });
      } else {
            //this.editeur.libelle = "admin";
            this.editeurService.createOrUpdateEditeur( this.editeur ).subscribe( data => {console.log(data);
            this.editeur = data.result;
            this.editeurs.push(this.editeur);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Editeur ajouté', life: 3000 })
            })

      }
      this.editeurs = [...this.editeurs];
      this.editeurDialog = false;
      this.editeur = {
        id: '',
        libelle: '',
        createdDate: '',
        lastUpdatedDate: '',
        url: '',
        deleted: true,
      };
  }
}
findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.editeurs.length; i++) {
      if (this.editeurs[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

deleteEditeur(editeur: Editeur) {
console.log("sosio oijzodij")
  this.deleteEditeurDialog = true;
  this.editeur = { ...editeur };
}


confirmDelete() {
  const editeurId = Number(this.editeur.id); // Convertit l'ID en nombre
  this.editeurService.deleteEditeur( editeurId).subscribe( data => {
      console.log("supp");
    this.deleteEditeurDialog = false;
    this.editeurs = this.editeurs.filter(val => val.id !== this.editeur.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Editeur supprimé', life: 3000 });
    this.editeur = {
      id: '',
      libelle: '',
      createdDate: '',
      lastUpdatedDate: '',
      url: '',
      deleted: true,
    };
  })
}

deleteSelectedEditeurs() {
    this.deleteEditeurDialog = true;
}

confirmDeleteSelected() {
    this.deleteEditeurDialog = false;
    this.editeurs = this.editeurs.filter(val => !this.selectedEditeurs.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Editeur supprimé', life: 3000 });
    this.selectedEditeurs = [];
}

editEditeur(editeur: Editeur) {
    this.editeur = { ...editeur };
    this.editeurDialog = true;
}


}
