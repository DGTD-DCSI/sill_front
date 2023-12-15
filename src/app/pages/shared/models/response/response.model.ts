export interface Response<T> {
 // body: import("c:/Users/MIS/Documents/SILL/SILL_UPDATE/sill_front/src/app/pages/shared/models/editeur.model").Editeur[];
  message: string;
  code: number;
  result: T;
}