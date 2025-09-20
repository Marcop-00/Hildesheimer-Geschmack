import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CuisineType, Restaurant } from '../../../interfaces/restaurant';
import { Comment } from '../../../interfaces/comment';
import { Rating } from '../../../interfaces/rating';
@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private apiUrl = 'http://localhost:3000/api/restaurants';
  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http
      .get<Restaurant[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getRestaurantsWithRatings(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/averaged-restaurant`);
  }

  getRestaurantById(id: Number): Observable<Restaurant> {
    return this.http
      .get<Restaurant>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getRestaurantByOwnerId(ownerId: Number): Observable<Restaurant> {
    return this.http
      .get<Restaurant>(`${this.apiUrl}/owner/${ownerId}`)
      .pipe(catchError(this.handleError));
  }

  createRestaurant(restaurantData:{
    name: string;
    description: string;
    address: string;
    workingHour: string;
    website: string;
    phone: string;
    cuisineType: CuisineType;
    glutenFree: boolean;
    lactoseFree: boolean;
    soyFree: boolean;
  }, ownerId: Number): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.apiUrl}/createrestaurant/${ownerId}`, restaurantData);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (typeof window !== 'undefined') {
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = `Server returned code ${error.status}, message: ${error.message}`;
      }
      console.error(errorMessage);
    }

    return throwError(() => new Error(errorMessage));
  }

  updateRestaurant(id: Number, updateData: {
    name: string;
    description: string;
    address: string;
    workingHour: string;
    website: string;
    phone: string;
    cuisineType: CuisineType;
    glutenFree: boolean;
    lactoseFree: boolean;
    soyFree: boolean;
  }): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/${id}`, updateData);
  }

  uploadRestaurantImage(id: Number, image: FormData) {
    return this.http.post(`${this.apiUrl}/${id}/upload`, image);
  }

  uploadRestaurantMenu(id: Number, menu: FormData) {
    return this.http.post(`${this.apiUrl}/${id}/uploadmenu`, menu);
  }

  getComments(restaurantId: Number) {
    return this.http.get<Comment[]>(`${this.apiUrl}/${restaurantId}/comments`);
  }

  addComment(restaurantId: Number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${restaurantId}/comments`, comment);
  }

  getAveragedRating(restaurantId: Number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${restaurantId}/rating`);
  }

  getUserRating(restaurantId: Number, userId: Number): Observable<Rating> {
    return this.http.get<Rating>(`${this.apiUrl}/${restaurantId}/rating/${userId}`);
  }

  //update the existing rating
  updateUserRating(restaurantId: Number, data: any, userId: Number): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${restaurantId}/rating/${userId}`, data);
  }

  //create a new rating
  createUserRating(restaurantId: Number, data: any, userId: Number): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/${restaurantId}/rating/${userId}`, data);
  }

  addFavoriteRestaurant(restaurantId: Number, userId: Number):Observable<any>{
    return this.http.post(`${this.apiUrl}/${restaurantId}/favorite`, {userId});
  }

  removeFavoriteRestaurant(restaurantId: Number, userId: Number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${restaurantId}/favorite/${userId}`, );
  }

  deleteRestaurant(ownerId: Number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/delete-restaurant/${ownerId}`, );
  }

}
