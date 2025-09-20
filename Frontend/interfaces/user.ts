import { Feedback } from "./feedback";
import { Rating } from "./rating";
import { Restaurant } from "./restaurant";

export interface User {
  id: Number;
  name: string;
  email: string;
  password: string;
  role: Role;
  image: string;
  favoriteRestaurants?: Restaurant[];
  comments?: Comment[];
  ratings?: Rating[];
  feedback?: Feedback[];
  createdAt: Date;
}

export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER'
}
