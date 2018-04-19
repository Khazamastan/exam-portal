import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){ }
  ngOnInit() {
    if(this.authService.isAuthorized()){
      const user = this.authService.getLoggedInUser();
      var hasToken = user.value.authToken;
        if(hasToken){
          const role = user.value.userRole;
          if(role == "Admin"){
            this.router.navigate(['/admin']);
          }else if(role == "Student"){
            this.router.navigate(['/exam']);
          }else{
            this.router.navigate(['/user/login']);
          }
        }
    });

  }  
}
