export interface Categorie {
    id?:number;
    libelleCat?:string;
    descriptionCat?:String;
    categorieMere?:Categorie;
}

export interface GetAllCategorieResponse {
    categories: Categorie[];
}
