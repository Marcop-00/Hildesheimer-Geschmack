import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/user';
import { Restaurant } from '../../../interfaces/restaurant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return new HttpHeaders();

    const parsedUser = JSON.parse(storedUser);
    const token = parsedUser?.token;

    if (!token) return new HttpHeaders();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getUserById(id: Number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  getFavoriteRestaurants(id: Number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      `${this.baseUrl}/${id}/favorite-restaurants`,
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  uploadProfileImage(userId: Number, formData: FormData) {
    return this.http.post(`${this.baseUrl}/${userId}/upload`, formData);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/`, {
      headers: this.getAuthHeaders(),
    });
  }

  getAllFeedbacks(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/feedbacks/fetch`, {
      headers: this.getAuthHeaders(),
    });
  }

  submitFeedback(message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/feedbacks`, { message });
  }

  updateUserbyId(id: Number, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
