import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteRestaurantCardComponent } from './favorite-restaurant-card.component';
import { Router } from '@angular/router';
import { Restaurant, CuisineType } from '../../../../interfaces/restaurant';

describe('FavoriteRestaurantCardComponent', () => {
  let component: FavoriteRestaurantCardComponent;
  let fixture: ComponentFixture<FavoriteRestaurantCardComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FavoriteRestaurantCardComponent],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRestaurantCardComponent);
    component = fixture.componentInstance;

    component.restaurant = {
      id: 1,
      name: 'Test Favorite Restaurant',
      description: 'A fantastic dining experience',
      image: 'test-image.jpg',
      menu: 'Sample menu',
      address: '456 Sample St',
      workingHour: '10 AM - 8 PM',
      website: 'https://favorite-restaurant.com',
      phone: '987-654-3210',
      cuisineType: CuisineType.JAPANESE,
      glutenFree: false,
      lactoseFree: true,
      soyFree: false,
      ownerId: 2002,
      favouriteBy: [],
      comments: [],
      ratings: [],
      avgRating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 5000,
      favoriteCount: 300,
      commentCount: 80,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display restaurant details correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Test Favorite Restaurant');
    expect(compiled.querySelector('.restaurant-details p').textContent).toContain('A fantastic dining experience');
  });

  it('should navigate to restaurant details page when clicked', () => {
    component.navigateToRestaurant();
    expect(router.navigate).toHaveBeenCalledWith(['/restaurant', 1]);
  });
});
