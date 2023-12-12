import { GroupeThematique } from "./groupeThematique.model";

export interface User {
  id: string;
  nom: string;
  prenom: string;
  token: string;
  login: string;
  isAdmin: boolean;
  isActif: boolean;
  groupeThematiques: GroupeThematique[];
}
