import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { Restaurant } from '../../../../interfaces/restaurant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  searchQuery: string = '';
  selectedFilter: string = 'newest';
  currentLang: string = 'en';

  constructor(
    private restaurantService: RestaurantsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.currentLang = localStorage.getItem('lang') || 'en';
    } else {
      this.currentLang = 'en';
    }
    this.translate.use(this.currentLang);
    this.getRestaurants();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe(
      (data) => {
        this.restaurants = this.sortRestaurants(data, this.selectedFilter);
        this.filteredRestaurants = [...this.restaurants];
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  searchRestaurants(): void {
    if (this.searchQuery.trim()) {
      this.filteredRestaurants = this.restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRestaurants = [...this.restaurants];
    }
    this.filterRestaurants();
  }

  filterRestaurants(): void {
    this.filteredRestaurants = this.sortRestaurants(
      this.filteredRestaurants,
      this.selectedFilter
    );
  }

  sortRestaurants(restaurants: Restaurant[], filter: string): Restaurant[] {
    return restaurants.sort((a, b) => {
      switch (filter) {
        case 'newest':
          return (
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
          );
        case 'oldest':
          return (
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
          );
        case 'mostFavorited':
          return (b.favoriteCount || 0) - (a.favoriteCount || 0);
        case 'mostCommented':
          return (b.commentCount || 0) - (a.commentCount || 0);
        case 'bestRated':
          return (b.avgRating || 0) - (a.avgRating || 0); // Sort by highest average rating
        default:
          return 0;
      }
    });
  }
}
