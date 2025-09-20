import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilepageComponentsOwnerAnalyticsComponent } from './profilepage-components-owner-analytics.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantsService } from '../../services/restaurants.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Restaurant } from '../../../../interfaces/restaurant';
import { NavbarComponent } from '../../shared_components/navbar/navbar.component';
import { FooterComponent } from '../../shared_components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ThemeToggleComponent } from '../../shared_components/theme-toggle/theme-toggle.component';

describe('ProfilepageComponentsOwnerAnalyticsComponent', () => {
  let component: ProfilepageComponentsOwnerAnalyticsComponent;
  let fixture: ComponentFixture<ProfilepageComponentsOwnerAnalyticsComponent>;
  let restaurantServiceSpy: jasmine.SpyObj<RestaurantsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let translateService: TranslateService;

  beforeEach(async () => {
    restaurantServiceSpy = jasmine.createSpyObj('RestaurantsService', ['getRestaurantById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProfilepageComponentsOwnerAnalyticsComponent, NavbarComponent, FooterComponent, ThemeToggleComponent],
      imports: [TranslateModule.forRoot(), HttpClientModule],
      providers: [
        { provide: RestaurantsService, useValue: restaurantServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepageComponentsOwnerAnalyticsComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    spyOn(translateService, 'use');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language correctly', () => {
    component.currentLang = 'en';
    component.toggleLanguage();
    expect(component.currentLang).toBe('de');
    expect(localStorage.getItem('lang')).toBe('de');
    expect(translateService.use).toHaveBeenCalledWith('de');

    component.toggleLanguage();
    expect(component.currentLang).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should fetch restaurant analytics on init', () => {
    const mockRestaurant: Restaurant = {
      id: 1,
      name: 'Test Restaurant',
      address: '',
      description: '',
      image: '',
      menu: '',
      workingHour: '',
      website: '',
      phone: '',
      cuisineType: 0,
      glutenFree: false,
      lactoseFree: false,
      soyFree: false,
      ownerId: 1,
      favouriteBy: [],
      viewCount: 100,
      favoriteCount: 50,
      commentCount: 20,
    };

    restaurantServiceSpy.getRestaurantById.and.returnValue(of(mockRestaurant));
    component.ngOnInit();

    expect(component.restaurantData).toEqual(mockRestaurant);
    expect(restaurantServiceSpy.getRestaurantById).toHaveBeenCalledWith(1);
  });

  it('should navigate to profile when navigateToProfile() is called', () => {
    component.navigateToProfile();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });
});
