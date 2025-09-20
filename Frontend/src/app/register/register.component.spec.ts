import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../shared_components/navbar/navbar.component';
import { FooterComponent } from '../shared_components/footer/footer.component';
import { ThemeToggleComponent } from '../shared_components/theme-toggle/theme-toggle.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let translate: TranslateService;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, NavbarComponent, FooterComponent, ThemeToggleComponent],
      imports: [FormsModule, TranslateModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        TranslateService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    translate = TestBed.inject(TranslateService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language between English and German', () => {
    component.currentLang = 'en';
    component.toggleLanguage();
    expect(component.currentLang).toBe('de');

    component.toggleLanguage();
    expect(component.currentLang).toBe('en');
  });

  it('should set registerError if passwords do not match', () => {
    component.password = 'password123';
    component.confirmPassword = 'password456';
    component.registerUser();
    expect(component.registerError).toBe(translate.instant('PASSWORDS_DO_NOT_MATCH'));
  });

  it('should call AuthService.register() and navigate on successful registration', () => {
    authService.register.and.returnValue(of({ message: 'User registered' }));
    component.name = 'Test User';
    component.email = 'test@example.com';
    component.password = 'password';
    component.confirmPassword = 'password';

    component.registerUser();

    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set registerError on registration failure', () => {
    const errorResponse = { error: { message: 'Registration failed' } };
    authService.register.and.returnValue(throwError(() => errorResponse));

    component.name = 'Test User';
    component.email = 'test@example.com';
    component.password = 'password';
    component.confirmPassword = 'password';

    component.registerUser();

    expect(component.registerError).toBe(translate.instant('REGISTRATION_FAILED'));
  });

  it('should navigate to home on goBackToHome()', () => {
    component.goBackToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
