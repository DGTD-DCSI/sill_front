import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GroupeThematique } from 'src/app/pages/shared/models/groupeThematique.model';
import { User } from 'src/app/pages/shared/models/user.model';
import { GroupeThematiqueService } from 'src/app/pages/shared/service/groupeThematique.service';
import { UserService } from 'src/app/pages/shared/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService],
})
export class UserComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private groupeThematiqueService: GroupeThematiqueService,
  ) {}
  multipleObjects: User[] = [];
  groupeThematiques: GroupeThematique[] = [];

  singleObject: User = {
    id: '',
    nom: '',
    prenom: '',
    password: '',
    token: '',
    login: '',
    isAdmin: false,
    isActif: false,
    groupeThematiques: [],
  };

  cols: any[] = [];

  // selectedUsers: User[] = [];

  submitted: boolean = false;

  flagSingleObjectDeleteDialog: boolean = false;

  // deleteUsersDialog: boolean = false;

  flagSingleObjectDialog: boolean = false;

  ngOnInit(): void {
    this.userService.read().subscribe((data) => {
        this.multipleObjects = data;
    });
    this.groupeThematiqueService.read().subscribe((data) => {
        this.groupeThematiques = data;
    });

    this.cols = [
      { field: 'nom', header: 'Nom' },
      { field: 'prenom', header: 'Prénom(s)' },
      { field: 'login', header: 'Identifiant' },
      { field: 'isAdmin', header: 'Est admin' },
      { field: 'isActif', header: 'Est Actif' },
      { field: 'groupeThematiques', header: 'Groupe thématique' },
    ];
  }

  // deleteSelectedProducts() {
  //   this.deleteUsersDialog = true;
  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    console.log("sdio oidfj")
    // console.log()
    console.log(this.groupeThematiques)
      this.singleObject ={
        id: '',
        nom: '',
        prenom: '',
        password: '',
        token: '',
        login: '',
        isAdmin: false,
        isActif: false,
        groupeThematiques: [],
      };
      this.submitted = false;
      this.flagSingleObjectDialog = true;
  }

  hideDialog() {
      this.flagSingleObjectDialog = false;
      this.submitted = false;
  }

  saveSingleObject() {
      this.submitted = true;

      if (this.singleObject.nom?.trim()) {
          if (this.singleObject.id) {
              // @ts-ignore
              this.userService.update( this.singleObject ).subscribe( data => {
                this.multipleObjects[this.findIndexById(this.singleObject.id)] = this.singleObject;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données utilisateur mis-à-jour', life: 3000 });
              })
          } else {
                this.singleObject.password = "admin";
                this.userService.create( this.singleObject ).subscribe( data => {
                    this.singleObject = data;
                    this.multipleObjects.push(this.singleObject);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur ajouté', life: 3000 });
                })

          }

          this.multipleObjects = [...this.multipleObjects];
          this.flagSingleObjectDialog = false;
          this.singleObject = {
            id: '',
            nom: '',
            prenom: '',
            password: '',
            token: '',
            login: '',
            isAdmin: false,
            isActif: false,
            groupeThematiques: [],
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

  deleteSingleObject(singleObject: User) {
      this.flagSingleObjectDeleteDialog = true;
      this.singleObject = { ...singleObject };
  }

  confirmDelete() {
    this.userService.delete( this.singleObject.id ).subscribe( data => {
        console.log("soidsoi oikjfvqz")
      this.flagSingleObjectDeleteDialog = false;
      this.multipleObjects = this.multipleObjects.filter(val => val.id !== this.singleObject.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
      this.singleObject = {
        id: '',
        nom: '',
        prenom: '',
        password: '',
        token: '',
        login: '',
        isAdmin: false,
        isActif: false,
        groupeThematiques: [],
      };
    })
  }

  // deleteSelectedUsers() {
  //     this.deleteUsersDialog = true;
  // }

  // confirmDeleteSelected() {
  //     this.deleteUsersDialog = false;
  //     this.multipleObjects = this.multipleObjects.filter(val => !this.selectedUsers.includes(val));
  //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateurs supprimé', life: 3000 });
  //     this.selectedUsers = [];
  // }

  editSingleObject(singleObject: User) {
      this.singleObject = { ...singleObject };
      this.flagSingleObjectDialog = true;
  }
}
