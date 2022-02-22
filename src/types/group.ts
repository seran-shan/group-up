import { User } from "./profile";

export type Group = {
  description: string;
  id: string;
  users: User[]
}
