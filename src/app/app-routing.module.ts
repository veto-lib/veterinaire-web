import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';

import { HomeComponent } from './pages/home/home.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { InformationsComponent } from './pages/informations/informations.component';
import { RecordComponent } from './pages/record/record.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard] },
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuard] },
  {
    path: 'informations',
    component: InformationsComponent,
    canActivate: [AuthGuard],
    canDeactivate: [UnsavedChangesGuard],
  },
  { path: 'dossier/:patientMail', component: RecordComponent, canActivate: [AuthGuard] },
  { path: 'consultation', component: ConsultationComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
