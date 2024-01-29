import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BankComponent } from './bank/bank.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'profile', component: ProfileComponent},
      { path: 'banco', component: BankComponent},
      { path: 'settings', component: SettingsComponent},
    ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
