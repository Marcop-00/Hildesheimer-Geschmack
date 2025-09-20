import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { RestaurantsService } from '../../services/restaurants.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Restaurant } from '../../../../interfaces/restaurant';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profilepage-components-owner-analytics',
  templateUrl: './profilepage-components-owner-analytics.component.html',
  styleUrl: './profilepage-components-owner-analytics.component.css',
})
export class ProfilepageComponentsOwnerAnalyticsComponent
  implements OnInit
{
  restaurantId!: Number;
  restaurantData: Restaurant = {} as Restaurant;
  viewsCount: Number = 0;
  commentsCount: Number = 0;
  feedbackCount: Number = 0;
  currentLang: string = 'en';
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantsService,
    private nav: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.currentLang);
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.getAnalytics();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  getAnalytics(): void {
    if (this.restaurantId) {
      this.restaurantService.getRestaurantById(this.restaurantId).subscribe((data) => {
        this.restaurantData = data;
        this.createChart();
      });
    }
  }

  createChart() {
    const ctx = document.getElementById('analyticsChart') as HTMLCanvasElement;

    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Views', 'Favorites', 'Comments'],
          datasets: [
            {
              data: [
                this.restaurantData.viewCount || 0,
                this.restaurantData.favoriteCount || 0,
                this.restaurantData.commentCount || 0,
              ],
              backgroundColor: ['green', 'red', 'blue'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  navigateToProfile(): void {
    this.nav.navigate(['/profile']);
  }
}
