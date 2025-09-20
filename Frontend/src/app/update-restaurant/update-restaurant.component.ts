import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../services/restaurants.service';
import { CuisineType, Restaurant } from '../../../interfaces/restaurant';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared_components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrl: './update-restaurant.component.css'
})
export class UpdateRestaurantComponent implements OnInit{
  restaurantId!: Number;
  restaurant: Restaurant = {} as Restaurant;
  cuisineTypes = Object.keys(CuisineType).filter(key => isNaN(Number(key)));
  currentLang: string = 'en';

  constructor(private restaurantService: RestaurantsService,
     private route: ActivatedRoute, private nav: Router,
      private translate: TranslateService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.currentLang);
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchRestaurantById();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  fetchRestaurantById(): void {
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(
      (restaurant) => {
        this.restaurant = restaurant;
      },
      (error) => {
        console.error('Failed to fetch restaurant data:', error);
      }
    );
  }

  updateRestaurant(): void {
    this.translate.get('CONFIRM_UPDATE_MESSAGE').subscribe((translatedMessage) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: { message: translatedMessage }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.confirmUpdateRestaurant();
        }
      });
    });
  }

  confirmUpdateRestaurant(): void {
    const updateData = {
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

    this.restaurantService.updateRestaurant(this.restaurantId, updateData).subscribe(
      (restaurant) => {
        this.restaurant = restaurant;
        this.translate.get('UPDATE_SUCCESS').subscribe((successMessage) => {
          alert(successMessage);
        });
      },
      (error) => {
        console.error('Failed to update restaurant:', error);
        this.translate.get('UPDATE_FAILED').subscribe((errorMessage) => {
          alert(errorMessage);
        });
      }
    );
  }


  onFileImageSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.restaurantService.uploadRestaurantImage(this.restaurantId, formData).subscribe(
        (response: any) => {
          this.restaurant.image = response.imageUrl;
          console.log('Image uploaded successfully:', response);
          alert('Image uploaded successfully!');
        },
        (error) => {
          console.error('Failed to upload image:', error);
          alert('Failed to upload image. Try again.');
        }
      );
    }
  }

  onFileMenuSelected(event:any){
    const file: File = event.target.files[0];

    if (file) {
      // Show a preview before uploading
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.restaurant.menu = e.target.result; // Set preview image
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('menu', file);

      this.restaurantService.uploadRestaurantMenu(this.restaurantId, formData).subscribe(
        (response: any) => {
          this.restaurant.menu = response.menuUrl; // Update with backend response
          alert('Menu uploaded successfully!');
        },
        (error) => {
          console.error('Failed to upload menu:', error);
          alert('Failed to upload menu. Try again.');
        }
      );
    }
  }

  navigateToProfile(): void {
    this.nav.navigate(['/profile']);
  }

}
