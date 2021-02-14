import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { PersonalDonationListComponent } from './components/personal-donation-list/personal-donation-list.component';
import { DonationEditComponent } from './components/donation-edit/donation-edit.component';
import { DonationDetailComponent } from './components/donation-detail/donation-detail.component';

const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'donation-list', component: DonationListComponent},
  {path: 'user/donation', component: PersonalDonationListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'user-edit', component: UserEditComponent},
  {path: 'donation-edit', component: DonationEditComponent},
  {path: 'user-edit/:id', component: UserEditComponent},
  {path: 'donation-edit/:id', component: DonationEditComponent},
  {path: 'donation-detail/:id', component: DonationDetailComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
