import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilepageComponentsAdminSectionComponent } from './profilepage-components-admin-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Role, User } from '../../../../interfaces/user';
import { Feedback } from '../../../../interfaces/feedback';
import { Restaurant } from '../../../../interfaces/restaurant';

describe('ProfilepageComponentsAdminSectionComponent', () => {
  let component: ProfilepageComponentsAdminSectionComponent;
  let fixture: ComponentFixture<ProfilepageComponentsAdminSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilepageComponentsAdminSectionComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ProfilepageComponentsAdminSectionComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to Users tab and display the user list', () => {
    // Set initial data for users
    component.users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
        role: Role.CUSTOMER,
        image: '',
        createdAt: new Date(),
      },
      {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: '',
        role: Role.CUSTOMER,
        image: '',
        createdAt: new Date(),
      },
    ];
    fixture.detectChanges();


    const usersTab = fixture.debugElement.query(By.css('li:nth-child(2)'));
    usersTab.triggerEventHandler('click', null);
    fixture.detectChanges();


    expect(component.activeTab).toBe('users');


    const userDivs = fixture.debugElement.queryAll(By.css('.user-info span'));
    expect(userDivs.length).toBe(2);
    expect(userDivs[0].nativeElement.textContent).toContain('John Doe');
    expect(userDivs[1].nativeElement.textContent).toContain('Jane Doe');
  });


  it('should switch to Restaurants tab and display the restaurant list', () => {

    component.restaurants = [
      {
        id: 1,
        name: 'Pizza Place',
        address: '123 Main St',
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
      },
      {
        id: 2,
        name: 'Sushi Spot',
        address: '456 Elm St',
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
        ownerId: 2,
        favouriteBy: [],
      },
    ];
    fixture.detectChanges();

    // Find and click the Restaurants tab (1st tab)
    const restaurantsTab = fixture.debugElement.query(By.css('li:nth-child(1)'));
    restaurantsTab.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Verify the active tab is 'restaurants'
    expect(component.activeTab).toBe('restaurants');

    // Check that restaurant names are displayed
    const restaurantDivs = fixture.debugElement.queryAll(By.css('.card-header h3'));
    expect(restaurantDivs.length).toBe(2);
    expect(restaurantDivs[0].nativeElement.textContent).toContain('Pizza Place');
    expect(restaurantDivs[1].nativeElement.textContent).toContain('Sushi Spot');
  });

  it('should switch to Feedbacks tab and display the feedback list', () => {
    // Set initial data for feedbacks
    component.feedbacks = [
      { _id: 1, message: 'Great service!', createdAt: new Date() },
      { _id: 2, message: 'Loved the food!', createdAt: new Date() },
    ];
    fixture.detectChanges();

    // Find and click the Feedbacks tab (3rd tab)
    const feedbacksTab = fixture.debugElement.query(By.css('li:nth-child(3)'));
    feedbacksTab.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Verify the active tab is 'feedbacks'
    expect(component.activeTab).toBe('feedbacks');

    // Check that feedback messages are displayed
    const feedbackDivs = fixture.debugElement.queryAll(By.css('.feedback-body p'));
    expect(feedbackDivs.length).toBe(2);
    expect(feedbackDivs[0].nativeElement.textContent).toContain('Great service!');
    expect(feedbackDivs[1].nativeElement.textContent).toContain('Loved the food!');
  });

});
