import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { User } from 'src/app/pages/shared/models/user.model';
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
    private userService: UserService
  ) {}
  users: User[] = [];

  user: User = {
    id: '',
    nom: '',
    prenom: '',
    token: '',
    login: '',
    isAdmin: false,
    isActif: false,
    groupeThematiques: [],
  };

  cols: any[] = [];

  selectedUsers: User[] = [];

  deleteUserDialog: boolean = false;

  deleteUsersDialog: boolean = false;

  userDialog: boolean = false;

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      if (data.code === 200) {
        this.users = data.result;
    console.log("osij");
    console.log(this.users);
      }
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
  // ngOnInit() {
  //     this.userService.getUsers( ).subscribe( data => {
  //         if( data.code == 200 ){
  //             this.users = data.result;
  //             console.log( this.users );
  //         }
  //     });

  //     this.cols = [
  //         { field: 'nom', header: 'Nom' },
  //         { field: 'prenom', header: 'Prénom(s)' },
  //         { field: 'login', header: 'Identifiant' },
  //         { field: 'isAdmin', header: 'Est admin' },
  //         { field: 'isActif', header: 'Est Actif' },
  //         { field: 'groupeThematiques', header: 'Groupe thématique' }
  //     ];
  // }

  deleteSelectedProducts() {
    this.deleteUsersDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
