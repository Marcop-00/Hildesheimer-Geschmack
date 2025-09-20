import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../shared_components/navbar/navbar.component';
import { FooterComponent } from '../shared_components/footer/footer.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ThemeToggleComponent } from '../shared_components/theme-toggle/theme-toggle.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent, NavbarComponent, FooterComponent, ThemeToggleComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot(), HttpClientTestingModule,],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a section for Our Mission', () => {
    const sectionElement: DebugElement = fixture.debugElement.query(By.css('.about-section h2'));
    expect(sectionElement.nativeElement.textContent).toContain('Our Mission');
  });

});
