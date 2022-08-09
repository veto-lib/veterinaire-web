import {
  APP_INITIALIZER,
  Injectable,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';

import {
  DateAdapter,
  CalendarModule,
  CalendarDateFormatter,
  CalendarNativeDateFormatter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { OAuthModule } from 'angular-oauth2-oidc';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EventModalComponent } from './components/event-modal/event-modal.component';
import { UploadDocumentModalComponent } from './components/upload-document-modal/upload-document-modal.component';
import { CreateEventModalComponent } from './components/create-event-modal/create-event-modal.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { YesNoModalComponent } from './components/yes-no-modal/yes-no-modal.component';
import { VisualizeNotesModalComponent } from './components/visualize-notes-modal/visualize-notes-modal.component';

import { ClinicComponent } from './pages/clinic/clinic.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { RecordComponent } from './pages/record/record.component';
import { ConsultationComponent } from './pages/consultation/consultation.component';
import { RegisterComponent } from './pages/register/register.component';

import { GenderPipe } from './pipes/gender.pipe';
import { SanitizeResourcePipe } from './pipes/sanitize.pipe';

import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { AuthorizationInterceptor } from './interceptors/auth.interceptor';
import { UnauthorizedInterceptor } from './interceptors/unauthorized.interceptor';

import { AuthService } from './services/auth.service';

registerLocaleData(localeFr);

export const momentAdapterFactory = () => {
  return adapterFactory(moment);
};

@Injectable()
class CustomDateFormatter extends CalendarNativeDateFormatter {
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('fr', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    CustomersComponent,
    AgendaComponent,
    EventModalComponent,
    CreateEventModalComponent,
    UploadDocumentModalComponent,
    ClinicComponent,
    RecordComponent,
    UserCardComponent,
    YesNoModalComponent,
    GenderPipe,
    SanitizeResourcePipe,
    VisualizeNotesModalComponent,
    ConsultationComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    OAuthModule.forRoot(),
    CalendarModule.forRoot(
      { provide: DateAdapter, useFactory: momentAdapterFactory },
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CustomDateFormatter,
        },
      }
    ),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (service: AuthService) => () => service.start(),
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
