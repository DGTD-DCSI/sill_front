import { Categorie } from "./categorie.model";
import { Editeur } from "./editeur.model";
import { GroupeThematique } from "./groupeThematique.model";
import { Version } from "./version.model";

  export interface Logiciel {
    id?: string;
    libelle: string;
    description: string;
    communauteUrl: string;
    nbTelechargement: number;
    isActif: boolean;
    logoUrl: string;
    telechargementUrl: string;
    categorie: Categorie;
    etat: any;
    editeur: Editeur;
    groupeThematique: GroupeThematique;
    lastVersion: Version;
    versions: Version[];
  }