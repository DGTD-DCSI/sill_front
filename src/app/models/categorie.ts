export interface Categorie {
    id?: number;
    libelleCat?: string;
    descriptionCat?: String;
    categorieMere?: Categorie;
    categorieMereID?: number;
    sous_categories?:Categorie[]

}

export interface GetAllCategorieResponse {
    categories: Categorie[];
}
