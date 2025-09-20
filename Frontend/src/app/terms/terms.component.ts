import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css',
})
export class TermsComponent {
  currentLang: string = 'en';

  constructor(private translate: TranslateService) {}

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
}
