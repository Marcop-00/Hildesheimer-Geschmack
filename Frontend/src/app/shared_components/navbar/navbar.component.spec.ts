import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getUser', 'logout']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use', 'get']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      declarations: [NavbarComponent, ThemeToggleComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: TranslateService, useValue: translateServiceSpy },

      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set authentication state on init', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getUser.and.returnValue({ user: { name: 'John Doe' } });

    fixture.detectChanges();

    expect(component.isAuthenticated).toBeTrue();
    expect(component.userData).toEqual({ user: { name: 'John Doe' } });
  });

  it('should change language when @Input() currentLang changes', () => {
    component.currentLang = 'de';
    component.ngOnChanges({
      currentLang: {
        currentValue: 'de',
        previousValue: 'en',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(translateServiceSpy.use).toHaveBeenCalledWith('de');
  });

  it('should emit langChange event when toggleLanguage is called', () => {
    spyOn(component.langChange, 'emit');

    component.toggleLanguage();

    expect(component.langChange.emit).toHaveBeenCalled();
  });

  it('should open confirmation dialog on logout', () => {
    const dialogRefMock = { afterClosed: () => of(true) };
    dialogSpy.open.and.returnValue(dialogRefMock as any);
    translateServiceSpy.get.and.returnValue(of('Are you sure you want to logout?'));

    component.logout();

    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should log out and navigate on confirmLogout', () => {
    spyOn(component.router, 'navigate');

    component.confirmLogout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(component.isAuthenticated).toBeFalse();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should display user profile when authenticated', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getUser.and.returnValue({ user: { name: 'Jane Doe' } });

    fixture.detectChanges();

    const profileButton = fixture.debugElement.query(By.css('.profile-btn'));
    expect(profileButton.nativeElement.textContent).toContain('Jane Doe');
  });

  it('should show login/register buttons when not authenticated', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(By.css('.login-btn'));
    const registerButton = fixture.debugElement.query(By.css('.register-btn'));

    expect(loginButton).toBeTruthy();
    expect(registerButton).toBeTruthy();
  });
});
