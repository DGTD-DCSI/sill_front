import { Licence } from "./licence.model";

export interface Version {
    id: string;
    libelle: string;
    datePublication: string;
    licence: Licence;
    lien: string;
    lienCodeSource: string;
    logo: string
    dateInscription: string;
    taille: number;
    lienDoc: string;
    formatTelechargement: any[];
    prerequis: any;
    langue: any;
    localUrl: any;
    logicielId: any;
  }