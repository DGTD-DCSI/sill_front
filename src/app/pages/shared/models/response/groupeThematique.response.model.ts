import { GroupeThematique } from "../groupeThematique.model";

export interface GroupeThematiqueResponse {
  message: string;
  code: number;
  result: GroupeThematique[];
}
