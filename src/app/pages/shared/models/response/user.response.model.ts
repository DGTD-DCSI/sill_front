import { User } from "../user.model";

export interface UserResponse {
  message: string;
  code: number;
  result: User[];
}
