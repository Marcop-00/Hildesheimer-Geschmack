import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FAQsComponent } from './faqs.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../shared_components/navbar/navbar.component';
import { FooterComponent } from '../shared_components/footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThemeToggleComponent } from '../shared_components/theme-toggle/theme-toggle.component';

describe('FAQsComponent', () => {
  let component: FAQsComponent;
  let fixture: ComponentFixture<FAQsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FAQsComponent, NavbarComponent, FooterComponent, ThemeToggleComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule,],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FAQsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of FAQs', () => {
    const faqItems = fixture.debugElement.queryAll(By.css('.faq-item'));
    expect(faqItems.length).toBe(component.faqs.length);
  });

  it('should toggle an FAQ when clicked', () => {
    const faqIndex = 0;
    const faqItem = fixture.debugElement.queryAll(By.css('.faq-question'))[faqIndex];


    expect(component.faqs[faqIndex].open).toBeFalse();
    fixture.detectChanges();
    let faqAnswer = fixture.debugElement.query(By.css('.faq-answer'));
    expect(faqAnswer.nativeElement.classList.contains('open')).toBeFalse();


    faqItem.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.faqs[faqIndex].open).toBeTrue();
    faqAnswer = fixture.debugElement.query(By.css('.faq-answer'));
    expect(faqAnswer.nativeElement.classList.contains('open')).toBeTrue();


    faqItem.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.faqs[faqIndex].open).toBeFalse();
    faqAnswer = fixture.debugElement.query(By.css('.faq-answer'));
    expect(faqAnswer.nativeElement.classList.contains('open')).toBeFalse();
  });
});
