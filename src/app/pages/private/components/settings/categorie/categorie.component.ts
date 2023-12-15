import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Categorie } from 'src/app/pages/shared/models/categorie.model';
import { CategorieService } from 'src/app/pages/shared/service/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss'],
  providers: [MessageService],
})
export class CategorieComponent implements OnInit {

  multipleObjects: Categorie[] = [];

  singleObject: Categorie ;
  
  // current_categorie: Categorie;

  selectedCategories: Categorie[] = [];
  cols = [];

  selectedCategorieMere: Categorie | null;

  categoriesMeres: Categorie[] = [];

  submitted: boolean = false;

  flagSingleObjectDeleteDialog: boolean = false;

  deleteCategoriesDialog: boolean = false;

  flagSingleObjectDialog: boolean = false;

  constructor(private categorieService: CategorieService, private messageService: MessageService
    ) { }

  ngOnInit(): void {
   
    this.categorieService.getCategories().subscribe((data) => {
     
        if( data.code == 200 ) {
          this.multipleObjects = data.result;

          this.categoriesMeres = data.result;
         // console.log(data.result);
          
        }
       
          
        
       this.singleObject = {} as Categorie;
  });
 

  this.cols = [
    { field: 'libelle', header: 'Libelle' },
    { field: 'description', header: 'Description' },
    { field: 'categorie_mere', header: 'Catégorie mère' },
  ];

  }


  hideDialog() {
    this.flagSingleObjectDialog = false;
    this.submitted = false;
}

saveSingleObject() {
    this.submitted = true;

    if (this.singleObject.libelle?.trim()) {
     // console.log("log");
      
        if (this.singleObject.id) {

            // // this.selectedCategorieMere.id = this.categorie.categorieMereId ;

            // this.selectedCategorieMere = this.categoriesMeres.find(
            //   (categorieMere) => categorieMere.id === this.categorie.categorieMereId
            // );

            //   console.log(this.selectedCategorieMere);
              
            //   this.categorieService.updateCategorie( this.categorie ).subscribe( data => {
            //     console.log(data);
                  
            //     this.categorie = data.result;
            //     this.categories[this.findIndexById(this.categorie.id)] = this.categorie;
            //     this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Données utilisateur mis-à-jour', life: 3000 });
            //   },  
            //   );

            this.singleObject.categorieMereId = this.selectedCategorieMere == null ? null : this.selectedCategorieMere.id   ; 

            this.categorieService.updateCategorie( this.singleObject ).subscribe( data => {
              this.singleObject = data.result;
              this.multipleObjects[this.findIndexById(this.singleObject.id)] = this.singleObject;
              this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Catégorie mise-à-jour', life: 3000 });
            })
          
        } 
        
        else {

          this.singleObject.categorieMereId = this.selectedCategorieMere == null ? null : this.selectedCategorieMere.id   ;

          // console.log(this.selectedCategorieMere);

          // console.log("sdjd");
          
          
          this.categorieService.saveCategorie( this.singleObject ).subscribe( data => {
          // console.log(data.result);
            
          this.singleObject = data.result;
          this.multipleObjects.push(this.singleObject);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Catégorie ajouté', life: 3000 });
          },  
          );

        }

        this.multipleObjects = [...this.multipleObjects];
        this.flagSingleObjectDialog = false;
        this.singleObject = {
          id: '',
          libelle: '',
          description: '',
          categorieMereId: null,
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

confirmDelete() {
  this.categorieService.deleteCategorie( this.singleObject.id ).subscribe( data => {
      console.log("confirmDelete")
    this.flagSingleObjectDeleteDialog = false;
    this.multipleObjects = this.multipleObjects.filter(val => val.id !== this.singleObject.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Catégorie supprimée', life: 3000 });
    this.singleObject = {
      id: '',
      libelle: '',
      description: '',
      categorieMereId: '',
     
    };
  })
}

// confirmDeleteSelected() {
//   this.deleteCategoriesDialog = false;
//   this.multipleObjects = this.multipleObjects.filter(val => !this.selectedCategories.includes(val));
//   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Catégories supprimés', life: 3000 });
//   this.selectedCategories= [];

// }

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

openNew() {
    this.singleObject ={
      id: '',
      libelle: '',
      description: '',
      categorieMereId: '',
      // categorieMere: null,
    };
    this.submitted = false;
    this.flagSingleObjectDialog = true;
}

editSingleObject(singleObject: Categorie) {
  this.singleObject = { ...singleObject };
  this.selectedCategorieMere = this.getCategorieMere(this.singleObject.categorieMereId);
  this.flagSingleObjectDialog = true;
}

getLibelleCategorieMere(categorieMereId: any): string {
  const categorieMere = this.multipleObjects.find((c) => c.id === categorieMereId);
  return categorieMere ? categorieMere.libelle : 'Aucune catégorie mère';
}

getCategorieMere(categorieMereId: any): Categorie {
  const categorie = this.multipleObjects.find((c) => c.id === categorieMereId);
  return categorieMereId ? categorie : null;
}

deleteSingleObject(categorie: Categorie) {
  console.log("deleteCategorie")
    this.flagSingleObjectDeleteDialog = true;
    this.singleObject = { ...categorie };
}





}