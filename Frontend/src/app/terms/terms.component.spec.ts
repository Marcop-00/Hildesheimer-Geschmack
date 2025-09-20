import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermsComponent } from './terms.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import HttpClientTestingModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermsComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the "Terms of Service" header', () => {
    const headerElement = fixture.debugElement.query(By.css('h1'));
    expect(headerElement.nativeElement.textContent).toBe('Terms of Service');
  });

  it('should display the last updated date', () => {
    const lastUpdatedElement = fixture.debugElement.query(By.css('.last-updated'));
    expect(lastUpdatedElement.nativeElement.textContent).toContain('March 1, 2025');
  });

  it('should have correct section titles', () => {
    const sectionHeaders = fixture.debugElement.queryAll(By.css('section h2'));
    const sectionTitles = sectionHeaders.map(header => header.nativeElement.textContent);

    const expectedTitles = [
      '1. Acceptance of Terms',
      '2. Service Description',
      '3. User Accounts',
      '4. Restaurant Owner Accounts',
      '5. User Conduct',
      '6. Content and Reviews',
      '7. Intellectual Property',
      '8. Limitation of Liability',
      '9. Modifications to the Service',
      '10. Changes to Terms',
      '11. Governing Law',
      '12. Contact Information',
    ];

    expect(sectionTitles).toEqual(expectedTitles);
  });

  it('should have a section for "Contact Information"', () => {
    const contactSection = fixture.debugElement.query(By.css('section:last-of-type'));
    expect(contactSection).toBeTruthy();

    const contactText = contactSection.nativeElement.textContent;
    expect(contactText).toContain('Marktplatz 1, 31134 Hildesheim, Germany');
    expect(contactText).toContain('+49 5121 123456');
  });
});
