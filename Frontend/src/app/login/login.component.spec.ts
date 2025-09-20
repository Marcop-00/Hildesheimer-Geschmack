import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../shared_components/navbar/navbar.component';
import { FooterComponent } from '../shared_components/footer/footer.component';
import { ThemeToggleComponent } from '../shared_components/theme-toggle/theme-toggle.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [LoginComponent, NavbarComponent, FooterComponent, ThemeToggleComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default email and password as empty', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePassword();
    expect(component.showPassword).toBeTrue();
  });

  it('should change language when toggleLanguage() is called', () => {
    component.currentLang = 'en';
    component.toggleLanguage();
    expect(component.currentLang).toBe('de');

    component.toggleLanguage();
    expect(component.currentLang).toBe('en');
  });

  it('should display login error message when login fails', () => {
    component.loginError = 'Invalid credentials';
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage.textContent).toContain('Invalid credentials');
  });

});
