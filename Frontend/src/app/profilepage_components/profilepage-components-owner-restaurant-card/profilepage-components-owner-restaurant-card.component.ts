import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../../../interfaces/restaurant';
import { RestaurantsService } from '../../services/restaurants.service';
import { ConfirmationDialogComponent } from '../../shared_components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profilepage-components-owner-restaurant-card',
  templateUrl: './profilepage-components-owner-restaurant-card.component.html',
  styleUrl: './profilepage-components-owner-restaurant-card.component.css'
})
export class ProfilepageComponentsOwnerRestaurantCardComponent {

  @Input() userRestaurant: Restaurant | null = null;

  constructor(private router: Router,
    private restaurantService: RestaurantsService,
    private dialog: MatDialog,
    private translate:TranslateService) {}

    navigateToRestaurant(): void {
      this.router.navigate(['/restaurant', this.userRestaurant!.id]);
    }
    navigateToAnalytics():void{
      this.router.navigate(['/analytics', this.userRestaurant!.id]);
    }
    navigateToUpdateRestaurant():void{
      this.router.navigate(['/update-restaurant', this.userRestaurant!.id]);
    }


  deleteRestaurant(): void {
    if (!this.userRestaurant) return;

    // Fetch the translated confirmation message
    this.translate.get('DELETE_CONFIRMATION_MESSAGE').subscribe(translatedMessage => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: { message: translatedMessage }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.confirmDeleteRestaurant();
        }
      });
    });
  }

  private confirmDeleteRestaurant(): void {
    if (!this.userRestaurant) return;

    this.restaurantService.deleteRestaurant(this.userRestaurant.ownerId).subscribe({
      next: () => {
        alert(this.translate.instant("DELETE_SUCCESS_MESSAGE"));
        window.location.reload();
      },
      error: (err) => {
        console.error("Error deleting restaurant:", err);
        alert(this.translate.instant("DELETE_ERROR_MESSAGE"));
      }
    });
  }
}
