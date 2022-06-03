import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormComponent } from './components/form/form.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { CookieService } from 'ngx-cookie-service';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { PageIntroductionComponent } from './components/page-introduction/page-introduction.component';
import { NavbarForumComponent } from './components/navbar-forum/navbar-forum.component';
import { ForumComponent } from './components/forum/forum.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FormComponent,
    SearcherComponent,
    AdminPageComponent,
    NavbarUserComponent,
    PageIntroductionComponent,
    NavbarForumComponent,
    ForumComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    NoopAnimationsModule,
    MatAutocompleteModule,MatFormFieldModule,ReactiveFormsModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  //schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
