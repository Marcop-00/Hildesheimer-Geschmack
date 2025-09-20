import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
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
