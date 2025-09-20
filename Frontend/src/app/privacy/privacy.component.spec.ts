import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyComponent } from './privacy.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';  // Import TranslateModule
import { By } from '@angular/platform-browser';
import { NavbarComponent } from '../shared_components/navbar/navbar.component';
import { FooterComponent } from '../shared_components/footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThemeToggleComponent } from '../shared_components/theme-toggle/theme-toggle.component';

describe('PrivacyComponent', () => {
  let component: PrivacyComponent;
  let fixture: ComponentFixture<PrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrivacyComponent, NavbarComponent, FooterComponent, ThemeToggleComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should display the last updated date', () => {
    const dateElement = fixture.debugElement.query(By.css('.last-updated')).nativeElement;
    expect(dateElement.textContent).toContain('Last updated: March 1, 2025');
  });

  it('should contain all the sections', () => {
    const sections = fixture.debugElement.queryAll(By.css('.policy-section h2'));
    const expectedSections = [
      '1. Introduction',
      '2. Information We Collect',
      '3. How We Use Your Information',
      '4. Data Sharing and Disclosure',
      '5. Data Security',
      '6. Your Rights',
      '7. Cookies and Similar Technologies',
      '8. Children\'s Privacy',
      '9. Changes to This Policy',
      '10. Contact Us',
    ];

    expect(sections.length).toBe(expectedSections.length);

    sections.forEach((section, index) => {
      expect(section.nativeElement.textContent).toContain(expectedSections[index]);
    });
  });

  it('should display contact information correctly', () => {
    const contactSection = fixture.debugElement.query(By.css('section:last-child')).nativeElement;
    expect(contactSection.textContent).toContain('Marktplatz 1, 31134 Hildesheim, Germany');
    expect(contactSection.textContent).toContain('+49 5121 123456');
  });
});
