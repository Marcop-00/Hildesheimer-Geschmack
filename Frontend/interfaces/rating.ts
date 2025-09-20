import { User } from "./user";

export interface Rating {
  id: Number;
  restaurantId: Number;
  userId: Number;
  value: number; // e.g., 1-5
  createdAt: Date;
  updatedAt?: Date;
  user?: User; // For populated user data
}
