import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilepageComponent } from './profilepage.component';
import { UserService } from '../../services/user.service';
import { RestaurantsService } from '../../services/restaurants.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { User, Role } from '../../../../interfaces/user';
import { Restaurant } from '../../../../interfaces/restaurant';
import { Feedback } from '../../../../interfaces/feedback';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared_components/navbar/navbar.component';
import { FooterComponent } from '../../shared_components/footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThemeToggleComponent } from '../../shared_components/theme-toggle/theme-toggle.component';

describe('ProfilepageComponent', () => {
  let component: ProfilepageComponent;
  let fixture: ComponentFixture<ProfilepageComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let restaurantService: jasmine.SpyObj<RestaurantsService>;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUserById',
      'getFavoriteRestaurants',
      'uploadProfileImage',
      'updateUserbyId',
      'getAllUsers',
      'getAllFeedbacks'
    ]);

    const restaurantServiceSpy = jasmine.createSpyObj('RestaurantsService', [
      'getRestaurantByOwnerId',
      'getRestaurants'
    ]);

    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, TranslateModule.forRoot()],
      declarations: [ProfilepageComponent, NavbarComponent, FooterComponent, ThemeToggleComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: RestaurantsService, useValue: restaurantServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilepageComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    restaurantService = TestBed.inject(RestaurantsService) as jasmine.SpyObj<RestaurantsService>;
    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data and set favorite restaurants when user is CUSTOMER', () => {
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: Role.CUSTOMER,
      image: 'user-image.jpg',
      createdAt: new Date()
    };

    const mockRestaurants: Restaurant[] = [
      {
        id: 10,
        name: 'Pizza Heaven',
        description: 'Delicious Pizza',
        image: 'pizza.jpg',
        menu: 'Pizza Menu',
        address: '123 Main St',
        workingHour: '10:00 AM - 10:00 PM',
        website: 'www.pizzaheaven.com',
        phone: '123-456-7890',
        cuisineType: 7, // Italian
        glutenFree: false,
        lactoseFree: false,
        soyFree: false,
        ownerId: 2,
        favouriteBy: [],
        createdAt: new Date()
      }
    ];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ user: mockUser }));
    userService.getUserById.and.returnValue(of(mockUser));
    userService.getFavoriteRestaurants.and.returnValue(of(mockRestaurants));

    component.fetchUserById();
    component.fetchFavoriteRestaurants(1);

    expect(userService.getFavoriteRestaurants).toHaveBeenCalledWith(1);
    expect(component.favoriteRestaurants).toEqual(mockRestaurants);
  });

  it('should fetch owner’s restaurant when user is OWNER', () => {
    const mockUser: User = {
      id: 2,
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
      role: Role.OWNER,
      image: 'owner-image.jpg',
      createdAt: new Date()
    };

    const mockRestaurant: Restaurant = {
      id: 5,
      name: 'Alice’s Bistro',
      description: 'Fine dining experience',
      image: 'bistro.jpg',
      menu: 'Gourmet Menu',
      address: '456 Park Ave',
      workingHour: '12:00 PM - 10:00 PM',
      website: 'www.alicesbistro.com',
      phone: '987-654-3210',
      cuisineType: 3, // French
      glutenFree: true,
      lactoseFree: true,
      soyFree: false,
      ownerId: 2,
      favouriteBy: [],
      createdAt: new Date()
    };

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ user: mockUser }));
    userService.getUserById.and.returnValue(of(mockUser));
    restaurantService.getRestaurantByOwnerId.and.returnValue(of(mockRestaurant));

    component.fetchUserById();
    component.fetchOwnerRestaurant(2);

    expect(restaurantService.getRestaurantByOwnerId).toHaveBeenCalledWith(2);
    expect(component.userRestaurant).toEqual(mockRestaurant);
  });

  it('should fetch admin data when user is ADMIN', () => {
    const mockUser: User = {
      id: 3,
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: Role.ADMIN,
      image: 'admin-image.jpg',
      createdAt: new Date()
    };

    const mockUsers: User[] = [mockUser];
    const mockRestaurants: Restaurant[] = [];
    const mockFeedbacks: Feedback[] = [{ _id: 1, message: 'Great service!', createdAt: new Date() }];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify({ user: mockUser }));
    userService.getUserById.and.returnValue(of(mockUser));
    userService.getAllUsers.and.returnValue(of(mockUsers));
    userService.getAllFeedbacks.and.returnValue(of(mockFeedbacks));
    restaurantService.getRestaurants.and.returnValue(of(mockRestaurants));

    component.fetchUserById();
    component.loadAdminData();

    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(userService.getAllFeedbacks).toHaveBeenCalled();
    expect(restaurantService.getRestaurants).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.feedbacks).toEqual(mockFeedbacks);
  });

  it('should toggle language', () => {
    component.currentLang = 'en';
    component.toggleLanguage();
    expect(component.currentLang).toBe('de');
    expect(translateService.use).toHaveBeenCalledWith('de');

    component.toggleLanguage();
    expect(component.currentLang).toBe('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });


});
