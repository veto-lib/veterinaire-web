import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnvalidatedUserGuard } from './guards/unvalidated-user.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { ValidatedUserGuard } from './guards/validated-user.guard.ts';
import { NewUserGuard } from './guards/new-user.guard';

import { HomeComponent } from './pages/home/home.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { InformationsComponent } from './pages/informations/informations.component';
import { RecordComponent } from './pages/record/record.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';
import { RegisterComponent } from './pages/register/register.component';
import { AwaitingComponent } from './pages/awaiting/awaiting.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'agenda', component: AgendaComponent, canActivate: [ValidatedUserGuard] },
  { path: 'patients', component: PatientsComponent, canActivate: [ValidatedUserGuard] },
  {
    path: 'informations',
    component: InformationsComponent,
    canActivate: [ValidatedUserGuard],
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'inscription',
    component: RegisterComponent,
    canActivate: [NewUserGuard],
    canDeactivate: [UnsavedChangesGuard],
  },
  {
    path: 'attente',
    component: AwaitingComponent,
    canActivate: [UnvalidatedUserGuard],
  },
  { path: 'dossier/:patientMail', component: RecordComponent, canActivate: [ValidatedUserGuard] },
  { path: 'consultation/:eventId', component: ConsultationComponent, canActivate: [ValidatedUserGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
