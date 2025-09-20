import { Component, Input } from '@angular/core';
import { Restaurant } from '../../../../interfaces/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-restaurant-card',
  templateUrl: './favorite-restaurant-card.component.html',
  styleUrl: './favorite-restaurant-card.component.css',
})
export class FavoriteRestaurantCardComponent {
  @Input() restaurant!: Restaurant;

  constructor(private router: Router) {}

  navigateToRestaurant(): void {
    this.router.navigate(['/restaurant', this.restaurant.id]);
  }
}
