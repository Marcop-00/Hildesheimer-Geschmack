import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilepageComponentsOwnerRestaurantCardComponent } from './profilepage-components-owner-restaurant-card.component';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestaurantsService } from '../../services/restaurants.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('ProfilepageComponentsOwnerRestaurantCardComponent', () => {
  let component: ProfilepageComponentsOwnerRestaurantCardComponent;
  let fixture: ComponentFixture<ProfilepageComponentsOwnerRestaurantCardComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProfilepageComponentsOwnerRestaurantCardComponent],
      providers: [
        { provide: Router, useValue: router },
        RestaurantsService
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        MatDialogModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepageComponentsOwnerRestaurantCardComponent);
    component = fixture.componentInstance;

    component.userRestaurant = {
      id: 1,
      name: 'Test Restaurant',
      description: 'A great place to eat',
      image: 'test-image.jpg',
      menu: 'Sample menu',
      address: '123 Test St',
      workingHour: '9 AM - 9 PM',
      website: 'https://test-restaurant.com',
      phone: '123-456-7890',
      cuisineType: 0,
      glutenFree: true,
      lactoseFree: false,
      soyFree: true,
      ownerId: 1001,
      favouriteBy: [],
      comments: [],
      ratings: [],
      avgRating: 4.5,
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 2000,
      favoriteCount: 100,
      commentCount: 150,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to restaurant details page when card is clicked', () => {
    component.navigateToRestaurant();
    expect(router.navigate).toHaveBeenCalledWith(['/restaurant', 1]);
  });

  it('should navigate to analytics page when "View Analytics" button is clicked', () => {
    component.navigateToAnalytics();
    expect(router.navigate).toHaveBeenCalledWith(['/analytics', 1]);
  });

  it('should navigate to update restaurant page when "Update Restaurant Details" button is clicked', () => {
    component.navigateToUpdateRestaurant();
    expect(router.navigate).toHaveBeenCalledWith(['/update-restaurant', 1]);
  });
});
