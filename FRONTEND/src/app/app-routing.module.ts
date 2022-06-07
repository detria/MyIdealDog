import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { CreateEditDogComponent } from './components/create-edit-dog/create-edit-dog.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormComponent } from './components/form/form.component';
import { ForumComponent } from './components/forum/forum.component';
import { LoginComponent } from './components/login/login.component';
import { PageIntroductionComponent } from './components/page-introduction/page-introduction.component';
import { RegisterComponent } from './components/register/register.component';
import { SearcherComponent } from './components/searcher/searcher.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'formulario', component:FormComponent },
  {path:'searcher',component:SearcherComponent},
  {path:'introduction',component:PageIntroductionComponent},
  {path:'forum',component:ForumComponent},
  {path:'userProfile',component:UserProfileComponent},
  {path:'admin',component:AdminPageComponent},
  {path:'createComment',component:CreateCommentComponent},
  {path:'createEditDog',component:CreateEditDogComponent},
  {path:'editUser',component:EditUserComponent},
  { path: '**', pathMatch:'full', redirectTo:'introduction' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
