import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExamComponent } from './exam/exam.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { AdminComponent } from "./admin/admin.component";
import { AdminAddComponent }  from './addQuestions/addQuestions.component';
import { AdminResultsComponent }  from './viewResults/viewResults.component';
import { HttpClientModule } from '@angular/common/http';
import { AppCounter } from "./counter/counter.component";
import { CounterService } from "./service/counter.service";
import { AuthenticationModule } from './service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExamComponent,
    AdminComponent,
    AdminAddComponent,
    AdminResultsComponent,
    AppCounter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationModule
  ],
  providers: [CounterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
