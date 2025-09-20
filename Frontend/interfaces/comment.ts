export interface Comment {
  id?: Number;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  restaurantId?: Number;
  userId?: Number;
  user?: {
    id?: Number;
    name?: string;
    image?: string;
  };
}
