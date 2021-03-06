export type Group = {
  description: string;
  name: string;
  date: string;
  id: string;
  age: string;
  membershipType: string;
  contactInfo: string;
  users: string[];
  interests: string[];
  image?: string | undefined;
  admin: string;
  location: string;
  superlikedGroups: string[];
  likedGroups: string[];
};
