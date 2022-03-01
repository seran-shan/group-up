import { Group } from './group';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  profilePic?: File;
  groups: Group[];
};
