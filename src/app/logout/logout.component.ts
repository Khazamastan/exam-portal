import { Component } from '@angular/core';
import { AuthenticationService } from '../service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
    constructor(
        private authService: AuthenticationService
    ){

    }
    logout(){
        this.authService.logout();
    }
    ngOnInit(){

    }
}
