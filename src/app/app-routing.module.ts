import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { PatientsComponent } from './pages/patients/patients.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
