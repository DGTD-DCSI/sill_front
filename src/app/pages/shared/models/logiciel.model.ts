import { Categorie } from "./categorie.model";
import { Editeur } from "./editeur.model";

  export interface Logiciel {
    id?: string;
    libelle: string;
    description: string;
    communauteUrl: string;
    isActif: boolean;
    logoUrl: string;
    telechargementUrl: string;
    categorie: Categorie;
    editeur: Editeur;
    groupeThematique: any;
  }