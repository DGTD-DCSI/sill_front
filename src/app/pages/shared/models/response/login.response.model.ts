import { User } from "../user.model";

export interface LoginResponse {
  message: string;
  code: number;
  result: User;
}
