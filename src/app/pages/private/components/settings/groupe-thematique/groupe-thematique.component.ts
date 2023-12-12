import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GroupeThematique } from 'src/app/pages/shared/models/groupeThematique.model';
import { GroupeThematiqueService } from 'src/app/pages/shared/service/groupeThematique.service';

@Component({
  selector: 'app-groupe-thematique',
  templateUrl: './groupe-thematique.component.html',
  styleUrls: ['./groupe-thematique.component.scss']
})
export class GroupeThematiqueComponent implements OnInit {

  groupeThematiques: GroupeThematique[] = [];

  groupeThematique: GroupeThematique = {
    'id': '',
    'code': '',
    'libelle': '',
  }

  cols: any[] = [];

  submitted: boolean = false;

  deleteUserDialog: boolean = false;

  groupeThematiqueDialog: boolean = false;

  selectedGroupeThematiques: GroupeThematique[] = [];

  deleteGroupeThematiquesDialog: boolean = false;

  constructor( private groupeThematiqueService: GroupeThematiqueService ) { }

  ngOnInit(): void {
    this.groupeThematiqueService.getGroupeThematiques().subscribe((data) => {
      this.groupeThematiques = data;
      console.log("doi")
      console.log(data)
    });

      
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'libelle', header: 'Libellé' },
    ];  
  }

  deleteSelectedGroupeThematiques() {
    this.deleteGroupeThematiquesDialog = true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
      this.groupeThematique ={
        id: '',
        code: '',
        libelle: '',
      };
      this.submitted = false;
      this.groupeThematiqueDialog = true;
  }

  hideDialog() {
      this.groupeThematiqueDialog = false;
      this.submitted = false;
  }

  saveGroupeThematique() {
      this.submitted = true;

      if (this.groupeThematique.code?.trim()) {
          if (this.groupeThematique.id) {
              // @ts-ignore
              this.groupeThematiques[this.findIndexById(this.groupeThematique.id)] = this.groupeThematique;
              // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données Groupe Thématique mis-à-jour', life: 3000 });
          } else {
                this.groupeThematiqueService.saveUser( this.groupeThematique ).subscribe( data => {
                this.groupeThematique = data;
                this.groupeThematiques.push(this.groupeThematique);
                // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'roupe Thématique ajouté', life: 3000 });
                })

          }

          this.groupeThematiques = [...this.groupeThematiques];
          this.groupeThematiqueDialog = false;
          this.groupeThematique = {
            'id': '',
            'code': '',
            'libelle': '',
          };
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.groupeThematiques.length; i++) {
          if (this.groupeThematiques[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  // deleteUser(groupeThematique: GroupeThematique) {
  //   console.log("sosio oijzodij")
  //     this.deleteGroupeThematiqueDialog = true;
  //     this.groupeThematique = { ...groupeThematique };
  // }

  // confirmDelete() {
  //   this.userService.deleteUser( this.user.id ).subscribe( data => {
  //       console.log("soidsoi oikjfvqz")
  //     this.deleteUserDialog = false;
  //     this.users = this.users.filter(val => val.id !== this.user.id);
  //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
  //     this.user = {
  //       id: '',
  //       nom: '',
  //       prenom: '',
  //       password: '',
  //       token: '',
  //       login: '',
  //       isAdmin: false,
  //       isActif: false,
  //       groupeThematiques: [],
  //     };
  //   })
  // }

  // deleteSelectedUsers() {
  //     this.deleteUsersDialog = true;
  // }

  // confirmDeleteSelected() {
  //     this.deleteUsersDialog = false;
  //     this.users = this.users.filter(val => !this.selectedUsers.includes(val));
  //     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateurs supprimé', life: 3000 });
  //     this.selectedUsers = [];
  // }

  // editUser(user: User) {
  //     this.user = { ...user };
  //     this.userDialog = true;
  // }

}
