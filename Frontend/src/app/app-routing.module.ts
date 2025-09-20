import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage_components/homepage/homepage.component';
import { ProfilepageComponent } from './profilepage_components/profilepage/profilepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';
import { ProfilepageComponentsOwnerAnalyticsComponent } from './profilepage_components/profilepage-components-owner-analytics/profilepage-components-owner-analytics.component';
import { UpdateRestaurantComponent } from './update-restaurant/update-restaurant.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { FAQsComponent } from './faqs/faqs.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'profile', component: ProfilepageComponent },
  { path: 'restaurant/:id', component: RestaurantDetailsComponent },
  { path: 'create-restaurant', component: CreateRestaurantComponent },
  { path: 'update-restaurant/:id', component: UpdateRestaurantComponent },
  { path: 'analytics/:id', component: ProfilepageComponentsOwnerAnalyticsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent},
  { path: 'faqs', component: FAQsComponent},
  { path: 'about', component: AboutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
