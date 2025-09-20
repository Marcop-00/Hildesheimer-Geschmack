import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  loginError: string = '';
  currentLang: string = 'en';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private translate: TranslateService) {}

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

  login() {
    this.isLoading = true;
    this.loginError = '';

    this.http.post<any>('http://localhost:3000/api/users/login', { email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response));
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Login failed', error);
          this.isLoading = false;

          if (error.status === 401) {
            this.loginError = this.translate.instant('INVALID_CREDENTIALS');
          } else if (error.status === 500) {
            this.loginError = this.translate.instant('SERVER_ERROR');
          } else {
            this.loginError = this.translate.instant('LOGIN_FAILED');
          }
        }
      });
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  goBackToHome(): void {
    this.router.navigate(['/']);
  }
}
