export interface Categorie {
    id?: string;
    deleted?: string;
    createdDate?: string;
    lastUpdatedDate?: string;
    libelle?: string;
    categorieMereId?: string;
    description?: string;
}

export interface Editeur {
    id?: string;
    deleted?: string;
    createdDate?: string;
    lastUpdatedDate?: string;
    libelle?: string;
    url?: string;
}

export interface GroupeThematique {
    id?: string;
    code?: string;
    libelle?: string;
}

export interface Versions {

}

export interface Logiciel {
    id?: string;
    deleted?: string;
    createdDate?: string;
    lastUpdatedDate?: string;
    libelle?: string;
    desciption?: string;
    communauteUrl?: string;
    isActif?: number;

    categorie?: Categorie;
    editeur?: Editeur;
    groupeThematique?: GroupeThematique;
    versions?: Versions[];
}