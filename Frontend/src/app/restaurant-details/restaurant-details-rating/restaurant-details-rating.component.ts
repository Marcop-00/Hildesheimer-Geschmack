import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-restaurant-details-rating',
  templateUrl: './restaurant-details-rating.component.html',
  styleUrl: './restaurant-details-rating.component.css'
})
export class RestaurantDetailsRatingComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  stars: Number[] = [1, 2, 3, 4, 5];
  hoveredRating: number = 0;

  rate(value: number) {
    this.rating = value;
    this.ratingChange.emit(value);
  }

  hover(value: number) {
    this.hoveredRating = value;
  }

  resetHover() {
    this.hoveredRating = 0;
  }
}
