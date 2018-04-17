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
import { AdminAddComponent }  from './addQuestions/addQuestions.component';
import { AdminResultsComponent }  from './viewResults/viewResults.component';
import { LogoutComponent }  from './logout/logout.component';

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
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationModule,
    NgxPaginationModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
