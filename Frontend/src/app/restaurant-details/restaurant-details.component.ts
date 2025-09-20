import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { AuthService } from '../services/auth.service';
import { Restaurant } from '../../../interfaces/restaurant';
import { Comment } from '../../../interfaces/comment';
import { Role } from '../../../interfaces/user';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared_components/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
})
export class RestaurantDetailsComponent implements OnInit {
  Math = Math;
  restaurant: Restaurant = {} as Restaurant;
  restaurantId: Number = 0;
  comments: Comment[] = [];
  newComment: string = '';
  rating: number = 0;
  stars: number[] = [];
  hoveredRating: number = 0;
  userRating: number = 0;
  isFavorite: boolean = false;
  userLogged: boolean = false;
  userRole: Role | undefined;
  currentLang: string = 'en';

  constructor(
    private route: ActivatedRoute,
    private restaurantsService: RestaurantsService,
    private authService: AuthService,
    private userService: UserService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.currentLang = localStorage.getItem('lang') || 'en';
    } else {
      this.currentLang = 'en';
    }
    this.translate.use(this.currentLang);
    this.fetchRestuarantData();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  fetchRestuarantData() {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.restaurantsService.getRestaurantById(this.restaurantId).subscribe(
      (restaurant) => {
        this.restaurant = restaurant;
      },
      (error) => {
        console.error('Failed to fetch restaurant:', error);
      }
    );
    this.fetchComments();
    this.fetchAveragedRating();

    if (this.authService.isLoggedIn()) {
      this.userLogged = true;
      this.userRole = this.authService.getRoleId();
      if (this.userRole !== 'OWNER') {
        this.fetchUserRating();
        this.checkIfFavorite();
      }
    }
  }


  fetchComments() {
    this.restaurantsService.getComments(this.restaurantId).subscribe(
      (comments) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Failed to fetch comments:', error);
      }
    );
  }

  fetchAveragedRating() {
    this.restaurantsService.getAveragedRating(this.restaurantId).subscribe(
      (average) => {
        this.rating = average;
        this.stars = Array(this.rating).fill(1); // Creates an array with `rating` elements
      },
      (error) => {
        console.error('Failed to fetch rating:', error);
      }
    );
  }

  fetchUserRating() {
    try {
      this.restaurantsService
        .getUserRating(this.restaurantId, this.authService.getUserId())
        .subscribe((rating) => {
          if (rating && rating.value !== undefined) {
            this.userRating = rating.value;
          } else {
            this.userRating = 0;
          }
        });
    } catch (error) {
      console.error('Failed to fetch rating:', error);
    }
  }


  downloadMenu() {
    if (this.restaurant.menu) {
      const link = document.createElement('a');
      link.href = this.restaurant.menu;
      link.target = '_blank';
      link.download = `Menu_${this.restaurant.name}.pdf`;
      link.click();
    } else {
      console.error('Menu PDF URL is not available');
    }
  }

  addComment() {
    if (!this.newComment.trim()) return;

    this.translate.get('CONFIRM_COMMENT_SUBMISSION').subscribe((translatedMessage: string) => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: { message: translatedMessage }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.confirmAddComment();
        }
      });
    });
  }
  private confirmAddComment(): void {
    const userId = this.authService.getUserId();

    const comment: Comment = {
      content: this.newComment,
      userId: userId,
      restaurantId: this.restaurantId,
    };

    this.restaurantsService.addComment(this.restaurantId, comment).subscribe(
      (comment) => {
        this.comments.push(comment);
        this.newComment = '';
      },
      (error) => {
        console.error('Failed to add comment:', error);
      }
    );
  }

  submitRating(value: number) {
    const restaurantId = this.restaurantId;
    const userId = this.authService.getUserId();
    const data = { value: value };

    this.restaurantsService
      .getUserRating(restaurantId, userId)
      .subscribe((rating) => {
        if (!rating) {
          this.restaurantsService
            .createUserRating(restaurantId, data, userId)
            .subscribe(
              (newRating) => {
                this.userRating = value;
                this.fetchAveragedRating();
              },
              (error) => {
                console.error('Failed to add rating:', error);
              }
            );
        } else {
          this.restaurantsService
            .updateUserRating(restaurantId, data, userId)
            .subscribe(
              (updatedRating) => {
                this.userRating = value;
                this.fetchAveragedRating();
              },
              (error) => {
                console.error('Failed to update rating:', error);
              }
            );
        }
      });
  }

  rate(value: number) {
    this.rating = value;
  }

  hover(value: number) {
    this.hoveredRating = value;
  }

  resetHover() {
    this.hoveredRating = 0;
  }

  checkIfFavorite() {
    const userId = this.authService.getUserId();
    this.userService.getFavoriteRestaurants(userId).subscribe(
      (favorites) => {
        this.isFavorite = favorites.some((fav) => fav.id === this.restaurantId);
      },
      (error) => {
        console.error('Failed to fetch favorites:', error);
      }
    );
  }

  toggleFavorite() {
    const userId: number = this.authService.getUserId();
    const actionKey = this.isFavorite ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE';

    this.translate.get(actionKey).subscribe((translatedAction) => {
      this.translate.get('CONFIRM_FAVORITE_ACTION', { action: translatedAction }).subscribe((translatedMessage) => {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '350px',
          data: { message: translatedMessage }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.confirmToggleFavorite(userId);
          }
        });
      });
    });
  }


  private confirmToggleFavorite(userId: number): void {
    if (this.isFavorite) {
      this.restaurantsService.removeFavoriteRestaurant(this.restaurantId, userId).subscribe(
        () => {
          this.isFavorite = false;
        },
        (error) => {
          console.error('Failed to remove favorite:', error);
        }
      );
    } else {
      this.restaurantsService.addFavoriteRestaurant(this.restaurantId, userId).subscribe(
        () => {
          this.isFavorite = true;
        },
        (error) => {
          console.error('Failed to add favorite:', error);
        }
      );
    }
  }
}
