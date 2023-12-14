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

  categories: Categorie[] = [];

  categorie: Categorie ;
  current_categorie: Categorie;

  selectedCategories: Categorie[] = [];
  cols = [];

  selectedCategorieMere: Categorie | null = null;

  categoriesMeres: Categorie[] = [];

  submitted: boolean = false;

  deleteCategorieDialog: boolean = false;

  deleteCategoriesDialog: boolean = false;

  categorieDialog: boolean = false;

  constructor(private categorieService: CategorieService, private messageService: MessageService
    ) { }

  ngOnInit(): void {
   
    this.categorieService.getCategories().subscribe((data) => {
     
        // if( data.code == 200 ) {
        //   this.categories = data.result;

        //   this.categoriesMeres = data.result;
        // }
       
          this.categories = data.result;

          this.categoriesMeres = data.result;
        
       this.categorie = {} as Categorie;
  });
 

  this.cols = [
    { field: 'libelle', header: 'Libelle' },
    { field: 'description', header: 'Description' },
    { field: 'categorie_mere', header: 'Catégorie mère' },
  ];

  }


  hideDialog() {
    this.categorieDialog = false;
    this.submitted = false;
}

saveCategorie() {
    this.submitted = true;

    if (this.categorie.libelle?.trim()) {
     // console.log("log");
      
        if (this.categorie.id) {

         // this.selectedCategorieMere.id = this.categorie.categorieMereId ;

          this.categorieService.updateCategorie( this.categorie ).subscribe( data => {
            console.log(data);
              
            this.categorie = data.result;
            this.categories[this.findIndexById(this.categorie.id)] = this.categorie;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Données utilisateur mis-à-jour', life: 3000 });
          },  
          );

          
          
        } 

        else {


          this.categorie.categorieMereId = this.selectedCategorieMere ? this.selectedCategorieMere.id : null ;

          console.log(this.categorie);
          
          this.categorieService.saveCategorie( this.categorie ).subscribe( data => {
            console.log(data);
            
          this.categorie = data.result;
          this.categories.push(this.categorie);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Catégorie ajouté', life: 3000 });
          },  
          );

          this.selectedCategorieMere = null;

        }

        this.categories = [...this.categories];
        this.categorieDialog = false;
        this.categorie = {
          id: '',
          libelle: '',
          description: '',
          categorieMereId: null,
        };
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

confirmDelete() {
  this.categorieService.deleteCategorie( this.categorie.id ).subscribe( data => {
      console.log("confirmDelete")
    this.deleteCategorieDialog = false;
    this.categories = this.categories.filter(val => val.id !== this.categorie.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Utilisateur supprimé', life: 3000 });
    this.categorie = {
      id: '',
      libelle: '',
      description: '',
      categorieMereId: '',
     
    };
  })
}

confirmDeleteSelected() {
  this.deleteCategoriesDialog = false;
  this.categories = this.categories.filter(val => !this.selectedCategories.includes(val));
  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Catégories supprimés', life: 3000 });
  this.selectedCategories= [];

}

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

openNew() {
    this.categorie ={
      id: '',
      libelle: '',
      description: '',
      categorieMereId: '',
      // categorieMere: null,
    };
    this.submitted = false;
    this.categorieDialog = true;
}

editCategorie(current_categorie: Categorie) {
  this.categorie = { ...current_categorie };
  this.selectedCategorieMere = this.getCategorieMere(this.categorie.categorieMereId);
  this.categorieDialog = true;
}

getLibelleCategorieMere(categorieMereId: any): string {
  const categorieMere = this.categories.find((c) => c.id === categorieMereId);
  return categorieMere ? categorieMere.libelle : 'Aucune catégorie mère';
}

getCategorieMere(categorieMereId: any): Categorie {
  const categorie = this.categories.find((c) => c.id === categorieMereId);
  return categorieMereId ? categorie : null;
}

deleteCategorie(categorie: Categorie) {
  console.log("deleteCategorie")
    this.deleteCategorieDialog = true;
    this.categorie = { ...categorie };
}





}