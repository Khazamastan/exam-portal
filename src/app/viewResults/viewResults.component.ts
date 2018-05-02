import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService, _site } from '../service';
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './viewResults.component.html',
  styleUrls: ['./viewResults.component.scss']
})
export class AdminResultsComponent {
    getResultUrl = `${_site}/exam/get-results`;
    onSubmit(e){
        //TODO : Do login here.
    }
    results = [];
    loggedInUser;
    currentPage = 1;
    constructor(
      private http : HttpClient,
      private authService: AuthenticationService,
      private spinner: Ng4LoadingSpinnerService,
    ){ }
    ngOnInit(){
      const user = this.authService.getLoggedInUser();
      const role = user.subscribe((data) =>{
        this.loggedInUser = data;
        this.getResults()
      })
    }
    getResults(){
      var authToken = this.loggedInUser.authToken;
      var userInfoID = this.loggedInUser.userInfoID;
      var headers = this.authService.getHeaders();
      const body = {
          authToken
      };
      this.spinner.show();
      this.http.get(this.getResultUrl, {headers})
        .subscribe((res:any) => {
            if(res && res.status){
              if(res.result){
                this.results = res.result;
              }
            }else{
            }
            this.spinner.hide();
            console.log(res)
        }, (res:any) => {
            this.spinner.hide();
            console.log(res);
        })
    }
}
