import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { LoginComponent }   from '../login/login.component';
import { RegisterComponent }  from '../register/register.component';
import { ExamComponent }  from '../exam/exam.component';
import { AdminComponent }  from '../admin/admin.component';
import { AdminAddComponent }  from '../addQuestions/addQuestions.component';
import { AdminResultsComponent }  from '../viewResults/viewResults.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'exam', component: ExamComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/add-questions', component: AdminAddComponent},
  { path: 'admin/view-results', component: AdminResultsComponent}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}