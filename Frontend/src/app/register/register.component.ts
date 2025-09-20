import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  userType: 'customer' | 'owner' = 'customer';
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  currentLang: string = 'en';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  registerError: string = '';

  constructor(private router: Router, private authService: AuthService, private translate: TranslateService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.currentLang = localStorage.getItem('lang') || 'en';
    } else {
      this.currentLang = 'en';
    }
    this.translate.use(this.currentLang);
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }

  registerUser(): void {
    if (this.password !== this.confirmPassword) {
      this.registerError = this.translate.instant('PASSWORDS_DO_NOT_MATCH');
      return;
    }

    this.isLoading = true;
    this.registerError = '';

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.userType.toUpperCase(),
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.isLoading = false;

        if (error.status === 400 && error.error?.error === 'Email already exists.') {
          this.registerError = this.translate.instant('EMAIL_ALREADY_EXISTS');
        } else {
          this.registerError = this.translate.instant('REGISTRATION_FAILED');
        }
      },
    });
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goBackToHome(): void {
    this.router.navigate(['/']);
  }
}
