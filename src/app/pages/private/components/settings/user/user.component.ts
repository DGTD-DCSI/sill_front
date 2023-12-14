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
  users: User[] = [];
  groupeThematiques: GroupeThematique[] = [];

  user: User = {
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

  selectedUsers: User[] = [];

  submitted: boolean = false;

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  userDialog: boolean = false;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
        this.users = data;
    });
    this.groupeThematiqueService.getGroupeThematiques().subscribe((data) => {
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

  deleteSelectedProducts() {
    this.deleteUsersDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    console.log("sdio oidfj")
    console.log(this.groupeThematiques)
      this.user ={
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
      this.userDialog = true;
  }

  hideDialog() {
      this.userDialog = false;
      this.submitted = false;
  }

  saveUser() {
      this.submitted = true;

      if (this.user.nom?.trim()) {
          if (this.user.id) {
              // @ts-ignore
              this.userService.update( this.user ).subscribe( data => {
                this.users[this.findIndexById(this.user.id)] = this.user;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données utilisateur mis-à-jour', life: 3000 });
              })
          } else {
                this.user.password = "admin";
                this.userService.saveUser( this.user ).subscribe( data => {
                    this.user = data;
                    this.users.push(this.user);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur ajouté', life: 3000 });
                })

          }

          this.users = [...this.users];
          this.userDialog = false;
          this.user = {
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
      for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  deleteUser(user: User) {
    console.log("sosio oijzodij")
      this.deleteUserDialog = true;
      this.user = { ...user };
  }

  confirmDelete() {
    this.userService.deleteUser( this.user.id ).subscribe( data => {
        console.log("soidsoi oikjfvqz")
      this.deleteUserDialog = false;
      this.users = this.users.filter(val => val.id !== this.user.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
      this.user = {
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

  deleteSelectedUsers() {
      this.deleteUsersDialog = true;
  }

  confirmDeleteSelected() {
      this.deleteUsersDialog = false;
      this.users = this.users.filter(val => !this.selectedUsers.includes(val));
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateurs supprimé', life: 3000 });
      this.selectedUsers = [];
  }

  editUser(user: User) {
      this.user = { ...user };
      this.userDialog = true;
  }
}
