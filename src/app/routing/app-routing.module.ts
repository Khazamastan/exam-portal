import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { LoginComponent }   from '../login/login.component';
import { RegisterComponent }  from '../register/register.component';
import { ExamComponent }  from '../exam/exam.component';
import { AdminComponent }  from '../admin/admin.component';
import { AdminAddComponent }  from '../add-questions/add-questions.component';
import { AdminResultsComponent }  from '../viewResults/viewResults.component';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';


const routes: Routes = [
  { 
    path: '', 
    canActivate: [ PublicGuard ],
    redirectTo: 'user/login', 
    pathMatch: 'full' 
  },
  { 
    canActivate: [ PublicGuard ],
    path: 'user/login',
     component: LoginComponent 
  },
  { 
    path: 'user/register',
    canActivate: [ PublicGuard ],
    component: RegisterComponent 
  },
  { 
    path: 'exam',
    // canActivate: [ ProtectedGuard ],
    component: ExamComponent 
  },
  { 
    path: 'admin',
    // canActivate: [ ProtectedGuard ],
    component: AdminComponent 
  },
  { 
    path: 'admin/add-questions',
    // canActivate: [ ProtectedGuard ],
    component: AdminAddComponent 
  },
  { 
    path: 'admin/view-results',
    // canActivate: [ ProtectedGuard   ],
    component: AdminResultsComponent 
  }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}