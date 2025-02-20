import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { GuestComponent } from './pages/guest/guest.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'register', component:RegisterComponent},
    {path:'invited', component:GuestComponent},
    {path:'**', redirectTo:'guest'}
];
