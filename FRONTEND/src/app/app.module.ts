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
import { ForumComponent } from './components/forum/forum.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreateEditDogComponent } from './components/create-edit-dog/create-edit-dog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { EditUserComponent } from './components/edit-user/edit-user.component';

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
    ForumComponent,
    UserProfileComponent,
    CreateCommentComponent,
    CreateEditDogComponent,
    EditUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
