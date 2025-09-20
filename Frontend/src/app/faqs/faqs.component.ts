import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css',
})
export class FAQsComponent {
  faqs = [
    {
      question: 'What is Hildesheim Geschmack?',
      answer:
        'Hildesheim Geschmack is a restaurant finder platform that helps users discover dining options in Hildesheim. Our platform provides detailed information about restaurants, including menus, operating hours, and special features.',
      open: false,
    },
    {
      question: 'Do I need to create an account to use Hildesheim Geschmack?',
      answer:
        'No, you can browse restaurants as a guest without creating an account. However, registered users enjoy additional features such as saving favorite restaurants, receiving personalized recommendations, and writing reviews.',
      open: false,
    },
    {
      question: 'How can I register as a restaurant owner?',
      answer:
        'To register your restaurant, click on the "Restaurant Owner" option during registration. You\'ll need to provide information about your establishment, including name, address, cuisine type, menu items, and photos. Our team will verify your information before your restaurant appears in listings.',
      open: false,
    },
    {
      question: "How do I update my restaurant's information?",
      answer:
        'Log in to your restaurant owner account, navigate to your restaurant profile, and click on "Edit Profile." You can update your menu, hours, photos, special offers, and other details from there.',
      open: false,
    },
    {
      question: 'How can I filter restaurants based on my dietary preferences?',
      answer:
        'Use the filter options available on the search page to narrow down restaurants based on dietary preferences such as vegetarian, vegan, gluten-free, etc. You can also filter by cuisine type, price range, and location.',
      open: false,
    },
    {
      question: 'Can I make reservations through Hildesheim Geschmack?',
      answer:
        'Yes, if a restaurant offers online reservations, you\'ll see a "Reserve" button on their profile. Click this button to make a reservation. Not all restaurants offer this feature; some may require direct contact.',
      open: false,
    },
    {
      question: 'How do I write a review for a restaurant?',
      answer:
        'To write a review, you must be a registered user and have a verified account. Navigate to the restaurant\'s profile page and click on the "Write a Review" button. You can rate your experience and provide detailed feedback.',
      open: false,
    },
    {
      question:
        'What should I do if I find incorrect information about a restaurant?',
      answer:
        'If you notice any inaccurate information, please click the "Report" button on the restaurant\'s profile page. Our team will review your report and make necessary corrections after verification.',
      open: false,
    },
    {
      question: 'Is Hildesheim Geschmack available as a mobile app?',
      answer:
        'Currently, Hildesheim Geschmack is available as a responsive web application that works well on mobile browsers. We are working on dedicated mobile apps for iOS and Android, which will be available soon.',
      open: false,
    },
    {
      question: 'How can I contact Hildesheim Geschmack support?',
      answer:
        'For support or inquiries, you can use the "Contact Us" form on our website, send an email to support@hildesheimgeschmack.de, or call our customer service at +49 5121 123456 during business hours (Monday to Friday, 9:00 AM - 5:00 PM).',
      open: false,
    },
  ];

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

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
