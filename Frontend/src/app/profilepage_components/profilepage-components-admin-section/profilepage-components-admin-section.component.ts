import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { Feedback } from '../../../../interfaces/feedback';
import { Restaurant } from '../../../../interfaces/restaurant';

@Component({
  selector: 'app-profilepage-components-admin-section',
  templateUrl: './profilepage-components-admin-section.component.html',
  styleUrls: ['./profilepage-components-admin-section.component.css'],
})
export class ProfilepageComponentsAdminSectionComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() feedbacks: Feedback[] = [];
  @Input() restaurants: Restaurant[] = [];

  activeTab: 'restaurants' | 'users' | 'feedbacks' = 'restaurants';
  searchRestaurantTerm: string = '';
  searchUserTerm: string = '';

  constructor() {}

  ngOnInit(): void {
    // Load initial data or perform other initialization tasks
  }

  // Search Functionality
  searchRestaurants(): void {
    if (this.searchRestaurantTerm) {
      this.restaurants = this.restaurants.filter((restaurant) =>
        restaurant.name
          .toLowerCase()
          .includes(this.searchRestaurantTerm.toLowerCase())
      );
    }
  }

  searchUsers(): void {
    if (this.searchUserTerm) {
      this.users = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchUserTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchUserTerm.toLowerCase())
      );
    }
  }

  // Delete Functionality
  deleteRestaurant(index: number): void {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurants.splice(index, 1);
    }
  }

  deleteUser(index: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users.splice(index, 1);
    }
  }

  // Edit Functionality
  editRestaurant(index: number): void {
    const newName = prompt(
      'Enter new restaurant name:',
      this.restaurants[index].name
    );
    if (newName) {
      this.restaurants[index].name = newName;
    }
  }
}
