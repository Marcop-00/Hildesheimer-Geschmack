import { Component, OnInit } from '@angular/core';
import { User, Role } from '../../../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Restaurant } from '../../../../interfaces/restaurant';
import { RestaurantsService } from '../../services/restaurants.service';
import { Feedback } from '../../../../interfaces/feedback';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfilepageComponent implements OnInit {
  user: User = {} as User;
  favoriteRestaurants: Restaurant[] = [];
  userRestaurant: Restaurant | null = null;
  Role = Role;
  currentLang: string = 'en';

  //admin section
  users: User[] = [];
  feedbacks: Feedback[] = [];
  restaurants: Restaurant[] = [];

  constructor(
    private usersService: UserService,
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
    this.fetchUserById();
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  fetchUserById(): void {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      const storedUser = JSON.parse(localStorage.getItem('user')!);
      const userId = storedUser.user.id;
      this.usersService.getUserById(userId).subscribe(
        (user) => {
          this.user = user;
          if (this.user.role === 'OWNER') {
            console.log(this.userRestaurant);
            this.fetchOwnerRestaurant(user.id);
            console.log(this.userRestaurant);
          } else if (this.user.role === 'CUSTOMER') {
            this.fetchFavoriteRestaurants(user.id);
          } else if (this.user.role === 'ADMIN') {
            this.loadAdminData();
          }
        },
        (error) => {
          console.error('Failed to fetch user:', error);
        }
      );
    } else {
      console.error('No user found in localStorage or running on the server');
    }
  }

  fetchOwnerRestaurant(UserId: Number): void {
    this.restaurantService.getRestaurantByOwnerId(UserId).subscribe(
      (restaurant) => {
        this.userRestaurant = restaurant;
        console.log(this.userRestaurant);
      },
      (error) => {
        console.error('Failed to fetch restaurant:', error);
      }
    );
  }

  fetchFavoriteRestaurants(UserId: Number): void {
    this.usersService.getFavoriteRestaurants(UserId).subscribe(
      (restaurants) => {
        this.favoriteRestaurants = restaurants;
      },
      (error) => {
        console.error('Failed to fetch favorite restaurants:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      this.usersService.uploadProfileImage(this.user.id, formData).subscribe(
        (response: any) => {
          this.user.image = response.imageUrl;
          const storedUser = JSON.parse(localStorage.getItem('user')!);
          storedUser.user.image = response.imageUrl;
          localStorage.setItem('user', JSON.stringify(storedUser));

          console.log('Image uploaded successfully:', response);
          alert('Image uploaded successfully!');
        },
        (error) => {
          console.error('Failed to upload image:', error);
          alert('Error uploading image.');
        }
      );
    }
  }

  loadAdminData(): void {
    this.usersService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Failed to fetch users:', error);
      }
    );

    this.restaurantService.getRestaurants().subscribe(
      (restaurants) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Failed to fetch restaurants:', error);
      }
    );

    this.usersService.getAllFeedbacks().subscribe(
      (feedbacks) => {
        this.feedbacks = feedbacks;
      },
      (error) => {
        console.error('Failed to fetch feedbacks:', error);
      }
    );
  }

  updateAccount(): void {
    const updateData: Partial<User> = {
      name: this.user.name,
      email: this.user.email,
      password: this.user.password ? this.user.password : undefined, // Send only if present
    };

    this.usersService.updateUserbyId(this.user.id, updateData).subscribe(
      (updatedUser) => {
        const storedUser = JSON.parse(localStorage.getItem('user')!);
        const storedToken = storedUser?.token || null; // Get token safely

        // Update localStorage with correct structure
        const updatedStorage = {
          token: storedToken, // Preserve token
          user: updatedUser,  // Directly store the updated user
        };

        localStorage.setItem('user', JSON.stringify(updatedStorage));
        // Update UI
        this.user = updatedUser;
        alert('Account updated successfully!');
      },
      (error) => {
        console.error('Failed to update account:', error);
        alert('Error updating account.');
      }
    );
  }

}
