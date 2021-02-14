import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DonationListComponent } from './components/donation-list/donation-list.component';
import { PersonalDonationListComponent } from './components/personal-donation-list/personal-donation-list.component';
import { DonationEditComponent } from './components/donation-edit/donation-edit.component';
import { DonationDetailComponent } from './components/donation-detail/donation-detail.component';
import { DonationReserveComponent } from './components/donation-reserve/donation-reserve.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    UserListComponent,
    UserEditComponent,
    DonationListComponent,
    PersonalDonationListComponent,
    DonationEditComponent,
    DonationDetailComponent,
    DonationReserveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
