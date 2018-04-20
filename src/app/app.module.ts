//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppCounter } from "./counter/counter.component";
import { CounterService } from "./service/counter.service";
import { AuthenticationModule } from './service';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExamComponent } from './exam/exam.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { AdminComponent } from "./admin/admin.component";
import { AdminAddComponent }  from './add-questions/add-questions.component';
import { AdminResultsComponent }  from './viewResults/viewResults.component';
import { LogoutComponent }  from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExamComponent,
    AdminComponent,
    AdminAddComponent,
    AdminResultsComponent,
    AppCounter,
    LogoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationModule,
    NgxPaginationModule,
    PerfectScrollbarModule,
    Ng4LoadingSpinnerModule
  ],
  providers: [
    CounterService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
