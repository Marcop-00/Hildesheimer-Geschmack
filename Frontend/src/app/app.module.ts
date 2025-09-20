import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage_components/homepage/homepage.component';
import { RestaurantCardComponent } from './homepage_components/restaurant-card/restaurant-card.component';
import { ProfilepageComponent } from './profilepage_components/profilepage/profilepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './shared_components/navbar/navbar.component';
import { FooterComponent } from './shared_components/footer/footer.component';
import { AuthService } from './services/auth.service';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { FavoriteRestaurantCardComponent } from './profilepage_components/favorite-restaurant-card/favorite-restaurant-card.component';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { ProfilepageComponentsAdminSectionComponent } from './profilepage_components/profilepage-components-admin-section/profilepage-components-admin-section.component';
import { ProfilepageComponentsOwnerRestaurantCardComponent } from './profilepage_components/profilepage-components-owner-restaurant-card/profilepage-components-owner-restaurant-card.component';
import { ProfilepageComponentsOwnerAnalyticsComponent } from './profilepage_components/profilepage-components-owner-analytics/profilepage-components-owner-analytics.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { RestaurantDetailsRatingComponent } from './restaurant-details/restaurant-details-rating/restaurant-details-rating.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationDialogComponent } from './shared_components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FAQsComponent } from './faqs/faqs.component';
import { ThemeToggleComponent } from './shared_components/theme-toggle/theme-toggle.component';
import { ChatbotComponent } from './shared_components/chatbot/chatbot.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RestaurantCardComponent,
    ProfilepageComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    RestaurantDetailsComponent,
    FavoriteRestaurantCardComponent,
    CreateRestaurantComponent,
    ProfilepageComponentsAdminSectionComponent,
    ProfilepageComponentsOwnerRestaurantCardComponent,
    ProfilepageComponentsOwnerAnalyticsComponent,
    UpdateRestaurantComponent,
    RestaurantDetailsRatingComponent,
    FeedbackComponent,
    ConfirmationDialogComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
    FAQsComponent,
    ThemeToggleComponent,
    ChatbotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    AuthService,
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
