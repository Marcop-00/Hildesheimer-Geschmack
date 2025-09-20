import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../../../interfaces/restaurant';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']

})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant;

  constructor(private router: Router) {}

  navigateToRestaurant(): void {
    this.router.navigate(['/restaurant', this.restaurant.id]);
  }
}
