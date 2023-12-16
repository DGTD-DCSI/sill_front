import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Compatibilite } from 'src/app/pages/shared/models/compatibilite.model';
import { CompatibiliteService } from 'src/app/pages/shared/service/compatibilite.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-compatibilite-os',
  templateUrl: './compatibilite-os.component.html',
  styleUrls: ['./compatibilite-os.component.scss'],
  providers: [MessageService],
})
export class CompatibiliteOsComponent implements OnInit {

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


  compatibilites: Compatibilite[] = [];
  selectedCompatibilites: Compatibilite[] = [];
  //cols = [];
  constructor( private messageService: MessageService, private compatibiliteService: CompatibiliteService) { }
 

  compatibilite: Compatibilite = {
    id: '',
    architecture: '',
    createdDate: '',
    lastUpdatedDate: '',
    libelle: '',
    deleted: true,
    langue: '',
  };

  cols: any[] = [];


  submitted: boolean = false;

  deleteCompatibiliteDialog: boolean = false;

 deleteeCompatibilitesDialog: boolean = false;

 compatibiliteDialog: boolean = false;
  ngOnInit(): void {
    this.compatibiliteService.getAllCompatibilites().subscribe((data) => {
     // console.log("un")
      //console.log(data)
        if( data ) {
          this.compatibilites = data;
        //  console.log("deux")
          //console.log(this.compatibilites)
        }
        //console.log("trois")
    });

    this.cols = [
      { field: 'libelle', header: 'Libellé' },
    //   { field: 'createdDate', header: 'Date de création' },
    //   { field: 'deleted', header: 'Est Supprimer' },
    //  { field: 'lastUpdatedDate', header: 'Date de la dernière mise à jour' },
      { field: 'architecture', header: 'Architecture' },
      { field: 'langue', header: 'Langue' },
    ];


  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  openNewCompatibilite() {
    this.compatibilite ={
      id: '',
      architecture: '',
      createdDate: '',
      lastUpdatedDate: '',
      libelle: '',
      deleted: true,
      langue: '',
    };
    this.submitted = false;
    this.compatibiliteDialog = true;
}

hideDialog() {
    this.compatibiliteDialog = false;
    this.submitted = false;
}


saveCompatibilite() {
  this.submitted = true;

  if (this.compatibilite.libelle?.trim()) {
      if (this.compatibilite.id) {
          // Mise à jour de 
            console.log('poiuytrew');
            console.log(this.compatibilite);
            
          this.compatibiliteService.UpdateCompatibilite(this.compatibilite).subscribe(data => {
            console.log('gggggggggg');
              console.log(data);
              this.updateCompatibiliteInList(this.compatibilite);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données Compatibilite mis-à-jour', life: 3000 });
              
              // Mise à jour de l'éditeur dans le tableau local
              const index = this.findIndexById(this.compatibilite.id);
              if (index !== -1) {
                  this.compatibilites[index] = this.compatibilite;
              }

              this.resetCompatibilite();
          });
      } else {
          // Création d'une nouvelle compatibilité
          this.compatibiliteService.createOrUpdateCompatibilite(this.compatibilite).subscribe(data => {
              // console.log(data);
              this.compatibilite =  data;
           //   console.log(data);
              this.compatibilites.push(this.compatibilite);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Compatibilite OS ajouté', life: 3000 });

              this.resetCompatibilite();
          });
      }
  }
}


resetCompatibilite() {
  this.compatibilites = [...this.compatibilites];
  this.compatibiliteDialog = false;
  this.compatibilite = {
    id: '',
    architecture: '',
    createdDate: '',
    lastUpdatedDate: '',
    libelle: '',
    deleted: true,
    langue: '',
  };
}

findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.compatibilites.length; i++) {
      if (this.compatibilites[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}

deleteCompatibilite(compatibilite: Compatibilite) {
  this.deleteCompatibiliteDialog = true;
  this.compatibilite = { ...compatibilite };
}


confirmDelete() {
  console.log('this.compatibilite') 
  console.log(this.compatibilite) 
  this.compatibiliteService.deleteCompatibilite( this.compatibilite.id).subscribe( data => {
      console.log("soidsoi oikjfvqz")
    this.deleteCompatibiliteDialog = false;
    this.compatibilites = this.compatibilites.filter(val => val.id !== this.compatibilite.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Compatibilites supprimé', life: 3000 });
    this.compatibilite = {
      id: '',
      architecture: '',
      createdDate: '',
      lastUpdatedDate: '',
      libelle: '',
      deleted: true,
      langue: '',
    };
  })
}

deleteSelectedCompatibilite() {
    this.deleteCompatibiliteDialog= true;
    
}

confirmDeleteSelected() {
    this.deleteCompatibiliteDialog = false;
    this.compatibilites = this.compatibilites.filter(val => !this.selectedCompatibilites.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Compatibilité supprimé', life: 3000 });
    this.selectedCompatibilites = [];
}

editCompatibilite(compatibilite: Compatibilite) {
    this.compatibilite = { ...compatibilite };
    this.compatibiliteDialog = true;
}


updateCompatibiliteInList(compatibilite: Compatibilite) {
  const index = this.compatibilites.findIndex(e => e.id === compatibilite.id);
  if (index !== -1) {
    this.compatibilites[index] = this.compatibilite;
    this.compatibilites = [...this.compatibilites]; // Déclenche la détection de changement
  }
}






}
