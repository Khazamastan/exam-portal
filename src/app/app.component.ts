import { Component } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import { AuthenticationService } from './service';
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
  :host ::ng-deep .custom-spinner-template {
    height: 50% !important;
    width: 50% !important;
    top: 26% !important;
    left: 24% !important;
  }
  `]
})
export class AppComponent {
  title = 'app';
  template: string =`<div class="span"><div class="typing_loader"></div></div>`
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private spinner: Ng4LoadingSpinnerService,
  ){ }
  ngOnInit() {
    if(this.authService.isAuthorized()){
      this.spinner.show();
      const user = this.authService.getLoggedInUser();
      const role = user.subscribe((data) =>{
          if(data && data.authToken){
            var role = "Student";
            if(data.userRole == "Admin"){
              if(window.location.href.indexOf('/admin') == -1){
                this.router.navigate(['/admin']);
              }
            }else if(data.userRole == "Student"){
              this.router.navigate(['/exam']);
            }
          }
        })
      }else{
        if(window.location.href.indexOf('/register') == -1){
          this.router.navigate(['/user/login']);
        }

    }

  }
  ngAfterViewInit() {
    this.spinner.hide();
  }
}
