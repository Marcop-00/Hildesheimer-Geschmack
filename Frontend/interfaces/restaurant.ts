import { Rating } from "./rating";
import { User } from "./user";
import { Comment } from './comment';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  image: string;
  menu: string;
  address: string;
  workingHour: string;
  website: string;
  phone: string;
  cuisineType: CuisineType;
  glutenFree: boolean;
  lactoseFree: boolean;
  soyFree: boolean;
  ownerId: number;
  favouriteBy: User[];
  comments?: Comment[];
  ratings?: Rating[];
  avgRating?:number;
  createdAt?: Date;
  updatedAt?: Date;
  viewCount?: number;
  favoriteCount?: number;
  commentCount?: number;
}

export enum CuisineType {
  AMERICAN,
  ASIAN,
  BAKERY,
  BURGER,
  CAFE,
  CHINESE,
  FAST_FOOD,
  FRENCH,
  INDIAN,
  ITALIAN,
  JAPANESE,
  KOREAN,
  MEXICAN,
  SEAFOOD,
  STEAKHOUSE,
  SUSHI,
  THAI,
  VEGETARIAN
}
