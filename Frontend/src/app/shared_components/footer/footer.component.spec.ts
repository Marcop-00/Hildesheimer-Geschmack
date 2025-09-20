import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FooterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have all footer links', () => {
    const links = fixture.debugElement.queryAll(By.css('.footer-link'));
    expect(links.length).toBe(5);

    const expectedLinks = [
      '/feedback',
      '/faqs',
      '/about',
      '/privacy',
      '/terms'
    ];

    links.forEach((link, index) => {
      expect(link.nativeElement.getAttribute('href') || link.nativeElement.getAttribute('routerLink')).toContain(expectedLinks[index]);
    });
  });

  it('should display the correct copyright text', () => {
    const footerText = fixture.debugElement.query(By.css('.footer-info p')).nativeElement.textContent;
    expect(footerText).toContain('© 2025 Hildesheimer Geschmack. All rights reserved.');
  });
});
