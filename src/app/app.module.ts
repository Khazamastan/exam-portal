import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ExamComponent } from './exam/exam.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { AdminComponent } from "./admin/admin.component";
import { AdminAddComponent }  from './addQuestions/addQuestions.component';
import { AdminResultsComponent }  from './viewResults/viewResults.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ExamComponent,
    AdminComponent,
    AdminAddComponent,
    AdminResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
