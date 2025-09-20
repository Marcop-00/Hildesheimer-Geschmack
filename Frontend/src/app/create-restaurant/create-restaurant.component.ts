import { Component, OnInit } from '@angular/core';
import { Restaurant, CuisineType } from '../../../interfaces/restaurant';
import { RestaurantsService } from '../services/restaurants.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared_components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
  restaurant: Restaurant = {
    name: '',
    description: '',
    address: '',
    workingHour: '',
    website: '',
    phone: '',
    cuisineType: CuisineType.AMERICAN,
    glutenFree: false,
    lactoseFree: false,
    soyFree: false,
    id: 0,
    image: '',
    menu: '',
    ownerId: 0,
    favouriteBy: [],
  };

  cuisineTypes = Object.keys(CuisineType).filter(key => isNaN(Number(key)));
  isLoading: boolean = false;
  errorMessage: string = '';
  currentLang: string = 'en';

  constructor(
    private restaurantService: RestaurantsService,
    private router: Router,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  createRestaurant(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to create this restaurant?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.submitRestaurant();
      }
    });
  }

  private submitRestaurant(): void {
    const restaurantData = {
      name: this.restaurant.name,
      description: this.restaurant.description,
      address: this.restaurant.address,
      workingHour: this.restaurant.workingHour,
      website: this.restaurant.website,
      phone: this.restaurant.phone,
      cuisineType: this.restaurant.cuisineType,
      glutenFree: this.restaurant.glutenFree,
      lactoseFree: this.restaurant.lactoseFree,
      soyFree: this.restaurant.soyFree,
    };

    const storedUser = JSON.parse(localStorage.getItem('user')!);
    const userId = storedUser.user.id;

    this.restaurantService.createRestaurant(restaurantData, userId).subscribe(
      (response) => {
        console.log('Restaurant created successfully', response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Error creating restaurant:', error);
      }
    );
  }
}
