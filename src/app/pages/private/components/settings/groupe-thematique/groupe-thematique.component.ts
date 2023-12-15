import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GroupeThematique } from 'src/app/pages/shared/models/groupeThematique.model';
import { GroupeThematiqueService } from 'src/app/pages/shared/service/groupeThematique.service';

@Component({
  selector: 'app-groupe-thematique',
  templateUrl: './groupe-thematique.component.html',
  styleUrls: ['./groupe-thematique.component.scss'],
  providers: [MessageService],
})
export class GroupeThematiqueComponent implements OnInit {

  multipleObjects: GroupeThematique[] = [];

  singleObject: GroupeThematique = {
    'id': '',
    'code': '',
    'libelle': '',
  }

  cols: any[] = [];

  submitted: boolean = false;

  flagSingleObjectDeleteDialog: boolean = false;

  flagSingleObjectDialog: boolean = false;

  constructor( private messageService: MessageService, private groupeThematiqueService: GroupeThematiqueService ) { }

  ngOnInit(): void {
    this.groupeThematiqueService.read().subscribe((data) => {
      this.multipleObjects = data;
      console.log("doi")
      console.log(data)
    });

      
    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'libelle', header: 'Libellé' },
    ];  
  }

  // deleteSelectedGroupeThematiques() {
  //   this.deleteGroupeThematiquesDialog = true;
  // }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
      this.singleObject ={
        id: '',
        code: '',
        libelle: '',
      };
      this.submitted = false;
      this.flagSingleObjectDialog = true;
  }

  editSingleObject(singleObject: GroupeThematique) {
      this.singleObject = { ...singleObject };
      this.flagSingleObjectDialog = true;
  }

  hideDialog() {
      this.flagSingleObjectDialog = false;
      this.submitted = false;
  }

  saveSingleObject() {
      this.submitted = true;

      if (this.singleObject.code?.trim()) {
          if (this.singleObject.id) {
              // @ts-ignore
              this.groupeThematiqueService.create( this.singleObject ).subscribe( data => {
                this.multipleObjects[this.findIndexById(this.singleObject.id)] = this.singleObject;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données Groupe Thématique mis-à-jour', life: 3000 }); 
              })
          } else {
                this.groupeThematiqueService.create( this.singleObject ).subscribe( data => {
                  this.singleObject = data;
                  this.multipleObjects.push(this.singleObject);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe Thématique ajouté', life: 3000 });
                })

          }

          this.multipleObjects = [...this.multipleObjects];
          this.flagSingleObjectDialog = false;
          this.singleObject = {
            'id': '',
            'code': '',
            'libelle': '',
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

  deleteGroupeThematique(groupeThematique: GroupeThematique) {
      this.flagSingleObjectDeleteDialog = true;
      this.singleObject = { ...groupeThematique };
  }

  confirmDelete() {
    console.log("avant")
    this.groupeThematiqueService.delete( this.singleObject ).subscribe( data => {
      console.log("après")
      this.flagSingleObjectDeleteDialog = false;
      this.multipleObjects = this.multipleObjects.filter(val => val.id !== this.singleObject.id);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Groupe thématique supprimé', life: 3000 });
      this.singleObject = {
        'id': '',
        'code': '',
        'libelle': '',
      };
    })
  }

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
