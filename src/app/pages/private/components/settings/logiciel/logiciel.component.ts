import { Component, OnInit } from '@angular/core';
import { LogicielService } from 'src/app/pages/shared/service/logiciel.service';
import { CommentaireService } from 'src/app/pages/shared/service/commentaires.service';
import { MessageService } from 'primeng/api';
import { Logiciel } from 'src/app/pages/shared/models/logiciel.model';
import { Table } from 'primeng/table';
import { CategorieService } from 'src/app/pages/shared/service/categorie.service';
import { EditeurService } from 'src/app/pages/shared/service/editeur.service';
import { GroupeThematiqueService } from 'src/app/pages/shared/service/groupeThematique.service';
import { VersionService } from 'src/app/pages/shared/service/version.service';
import { Categorie } from 'src/app/pages/shared/models/categorie.model';
import { Commentaire } from 'src/app/pages/shared/models/commentaire.model';
import { Editeur } from 'src/app/pages/shared/models/editeur.model';
import { GroupeThematique } from 'src/app/pages/shared/models/groupeThematique.model';
import { Version } from 'src/app/pages/shared/models/version.model';
// import { TooltipModule } from 'primeng/tooltip';
import {SplitButtonModule} from 'primeng/splitbutton';

@Component({
  selector: 'app-logiciel',
  templateUrl: './logiciel.component.html',
  styleUrls: ['./logiciel.component.scss'],
  providers: [MessageService],
})
export class LogicielComponent implements OnInit {
  multipleObjects: Logiciel[] = [];
  commentaires: Commentaire[] = [];
  commentaire: Commentaire = {
    id: null,
    libelle: '',
    // logicielId: null,
  };
  pVersion: Version = {
    id: '',
    libelle: '',
    datePublication: '',
    licence: null,
    lien: '',
    lienCodeSource: '',
    logo: '',
    dateInscription: '',
    taille: 0,
    lienDoc: '',
    formatTelechargement: [],
    prerequis: '',
    langue: '',
    localUrl: '',
    logicielId: '',
  };
  singleObject: Logiciel = {
    id: null,
    libelle: '',
    description: '',
    communauteUrl: '',
    nbTelechargement: 0,
    isActif: true,
    logoUrl: '',
    telechargementUrl: '',
    categorie: null,
    etat: null,
    editeur: null,
    groupeThematique: null,
    lastVersion: this.pVersion,
    versions: [],
  };
  selectedLogiciels: Logiciel[] = [];
  cols = [];

  /*itemsDecision  = [
    {label: 'Rejeter la proposition', icon: 'pi pi-undo', command: () => {
        this.rejeter(this.singleObject);
    }},
    {label: 'Retirer le logiciel', icon: 'pi pi-times', command: () => {
      this.retirer(this.singleObject);
      }},
      {label: 'Accepter la proposition', icon: 'pi pi-check', command: () => {
        this.accepter(this.singleObject);
      }},
      {separator: true},
 
  ];*/

  logid: null;

  flagSingleObjectNewVersion: boolean = false;
  flagSingleObjectDialog: boolean = false;
  commentDialog: boolean = false;
  rejetDialog: boolean = false;
  retraitDialog: boolean = false;
  acceptDialog: boolean = false;
  commentViewDialog: boolean = false;
  flagSingleObjectDeleteDialog: boolean = false;
  submitted: boolean = false;

  categoriesList: Categorie[] = [];
  editeursList: Editeur[] = [];
  groupesThematiquesList: GroupeThematique[] = [];
  versionsList: Version[] = [];

  constructor( 
    private messageService: MessageService, private logicielService: LogicielService, 
    private categorieService: CategorieService, private editeurService: EditeurService,
    private groupeThematiqueService: GroupeThematiqueService, private versionService: VersionService,
    private commentaireService: CommentaireService) { }

  ngOnInit(): void {
    /*this.itemsDecision = [
      {label: 'Rejeter la proposition', icon: 'pi pi-undo', command: () => {
          this.rejeter(this.singleObject);
      },
      {label: 'Retirer le logiciel', icon: 'pi pi-remove', command: () => {
        this.retirer(this.singleObject);
        },
        {label: 'Accepter la proposition', icon: 'pi pi-check', command: () => {
          this.accepter(this.singleObject);
        },
        {separator: true},
        
        {label: 'Commenter', icon: 'pi pi-times', command: () => {
          this.commenter();
        },

    ];*/
    this.logicielService.readPrivate().subscribe((data) => {
        if( data.code == 200 ) {
          this.multipleObjects = data.result;
        console.log(this.multipleObjects, "logiciels");

        }
    });
    this.categorieService.getCategories().subscribe((data) => {
        if( data.code == 200 ) {
          this.categoriesList = data.result;
        }
    });
    this.editeurService.getAllEditeurs().subscribe((data) => {
      if( data.code == 200 ) {
        this.editeursList = data.result;
      }
    });
    this.groupeThematiqueService.read().subscribe((data) => {
        this.groupesThematiquesList = data;
    });
    // this.versionService.read().subscribe((data) => {
    //   if( data.code == 200 ) {
    //     this.versionsList = data.result;
    //   }
    // });

    this.cols = [
      { field: 'libelle', header: 'Libellé' },
      { field: 'description', header: 'Description' },
      { field: 'isActif', header: 'Est Actif' },
      { field: 'logoUrl', header: 'Logo' },
      { field: 'categorie', header: 'Catégorie' },
      { field: 'editeur', header: 'Editeur' },
      { field: 'groupeThematique', header: 'Groupe Thématique' },
    ];
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    console.log("sdio oidfj")
    console.log(this.editeursList)
    console.log(this.versionsList)
    this.pVersion = {
      id: '',
      libelle: '',
      datePublication: '',
      licence: null,
      lien: '',
      lienCodeSource: '',
      logo: '',
      dateInscription: '',
      taille: 0,
      lienDoc: '',
      formatTelechargement: [],
      prerequis: '',
      langue: '',
      localUrl: '',
      logicielId: '',
    };
      this.singleObject ={
        id: null,
        libelle: '',
        description: '',
        communauteUrl: '',
        nbTelechargement: 0,
        isActif: true,
        logoUrl: '',
        telechargementUrl: '',
        categorie: null,
        etat: null,
        editeur: null,
        groupeThematique: null,
        lastVersion: this.pVersion,
        versions: [],
      };
      this.submitted = false;
      this.flagSingleObjectDialog = true;
      this.flagSingleObjectNewVersion = false;
  }

  hideDialog() {
    this.flagSingleObjectDialog = false;
    this.flagSingleObjectNewVersion = false;
    this.commentDialog = false;
    this.rejetDialog = false;
    this.retraitDialog = false;
    this.acceptDialog = false;
    this.commentViewDialog = false;
      this.submitted = false;
  }

  editSingleObject(singleObject: Logiciel) {
      this.singleObject = { ...singleObject };
      this.flagSingleObjectDialog = true;
  }

  saveSingleObject() {
      this.submitted = true;
      if (this.singleObject.libelle?.trim()) {
        console.log("après trim")
          if (this.singleObject.id) {
              // @ts-ignore
              this.logicielService.update( this.singleObject ).subscribe( data => {
                if( data.code == 200 ){
                  this.multipleObjects[this.findIndexById(this.singleObject.id)] = data.result
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données logiciel mis-à-jour', life: 3000 });
                }
              })
          } else {
                this.logicielService.create( this.singleObject ).subscribe( data => {
                  // if( data.code == 200 ){
                    this.singleObject = data.result;
                    this.multipleObjects.push(this.singleObject);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Logiciel ajouté', life: 3000 });
                  // } else{
                  //   this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'L\'ajout du logiciel a échoué', life: 3000 });
                  // }
                })

          }

          this.multipleObjects = [...this.multipleObjects];
          this.flagSingleObjectDialog = false;
          this.pVersion = {
            id: '',
            libelle: '',
            datePublication: '',
            licence: null,
            lien: '',
            lienCodeSource: '',
            logo: '',
            dateInscription: '',
            taille: 0,
            lienDoc: '',
            formatTelechargement: [],
            prerequis: '',
            langue: '',
            localUrl: '',
            logicielId: '',
          };
          this.singleObject = {
            id: null,
            libelle: '',
            description: '',
            communauteUrl: '',
            nbTelechargement: 0,
            isActif: true,
            logoUrl: '',
            telechargementUrl: '',
            categorie: null,
            etat: null,
            editeur: null,
            groupeThematique: null,
            lastVersion: this.pVersion,
            versions: [],
          };
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.multipleObjects.length; i++) {
          if (this.multipleObjects[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  deleteSingleObject(singleObject: Logiciel) {
    console.log("soiez oijnzefoqij oiijnzqdq")
      this.flagSingleObjectDeleteDialog = true;
      this.singleObject = { ...singleObject };
  }

  confirmDelete() {
    this.logicielService.delete( this.singleObject.id ).subscribe( data => {
      this.flagSingleObjectDeleteDialog = false;
      this.multipleObjects = this.multipleObjects.filter(val => val.id !== this.singleObject.id); 
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
      this.pVersion = {
        id: '',
        libelle: '',
        datePublication: '',
        licence: null,
        lien: '',
        lienCodeSource: '',
        logo: '',
        dateInscription: '',
        taille: 0,
        lienDoc: '',
        formatTelechargement: [],
        prerequis: '',
        langue: '',
        localUrl: '',
        logicielId: '',
      };
      this.singleObject = {
        id: null,
        libelle: '',
        description: '',
        communauteUrl: '',
        nbTelechargement: 0,
        isActif: true,
        logoUrl: '',
        telechargementUrl: '',
        categorie: null,
        etat: null,
        editeur: null,
        groupeThematique: null,
        lastVersion: this.pVersion,
        versions: [],
      };
    })
  }


  openCommentaire(singleObject) {
    this.commentDialog = true;
    this.commentaire = {
      id: null,
      libelle: '',
      // logicielId: null,
    };
    this.logid = singleObject;

    this.submitted = false;
}

openCommentaireView(singleObject) {
  this.commentViewDialog = true;

  this.commentaireService.getCommentaires(singleObject).subscribe((data) => {
    if( data.code == 200 ) {
      this.commentaires = data.result;
      console.log(this.commentaires, "Commentaire");
    }
  });
}


  commenter( ){
    this.submitted = true;
      if (this.commentaire.libelle?.trim()) {
            this.commentaireService.create( this.commentaire, this.logid  ).subscribe( data => {
                this.commentaire = data.result;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Commenataire ajouté', life: 3000 });
            })
          this.commentDialog = false;

      }

  }
      
  rejeter(singleObject: Logiciel){
    this.rejetDialog = true;
    this.singleObject = { ...singleObject };
  }

  retirer(singleObject: Logiciel){
    this.retraitDialog = true;
    this.singleObject = { ...singleObject };
  }

  accepter(singleObject: Logiciel){
    this.acceptDialog = true;
    this.singleObject = { ...singleObject };
  }

  rejeterConfirm(){
    this.logicielService.rejeter( this.singleObject ).subscribe( data => {
    this.rejetDialog = false;
    this.multipleObjects = this.multipleObjects.filter(val => val.id !== this.singleObject.id); 
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Logiciel rejeté', life: 3000 });
    })
  }

  retirerConfirm(){
    this.logicielService.retirer( this.singleObject).subscribe( data => {
    this.retraitDialog = false;
    this.multipleObjects = this.multipleObjects.filter(val => val.id !== this.singleObject.id); 
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Logiciel retiré', life: 3000 });
    })
    
  }

  accepterConfirm(){
    this.logicielService.accepter( this.singleObject ).subscribe( data => {
    this.acceptDialog = false;
    this.multipleObjects = this.multipleObjects.filter(val => val.id !== this.singleObject.id); 
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Logiciel accepté', life: 3000 });
    })
    
  }

}
