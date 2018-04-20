import { Component } from '@angular/core';
import {Login} from "./login";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service';
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    apiUrl = 'http://localhost:9009/user/login'
    login : FormGroup
    isSubmitted: boolean = false;
    error;
    constructor(
        private http : HttpClient, 
        private router: Router, 
        private frmBuilder: FormBuilder,
        private authService: AuthenticationService,
        private spinner: Ng4LoadingSpinnerService,
    ) { }
    onSubmit(){
        this.isSubmitted = true;
        if(!this.login.valid)
         return;
        
        const body = this.login.value;

        this.spinner.show();
        const req = this.authService.login(body).subscribe((res:any) => {
                debugger;
                if(res && res.status){
                    console.log(res);
                    if(res.result.userRole == "Admin"){
                          this.router.navigate(['/admin']);
                      }else if(res.result.userRole == "Student"){
                        this.router.navigate(['/exam']);
                      }else{
                        this.router.navigate(['/user/login']);
                      }
                }else{
                    this.error = "Unable to Login"
                }
                this.spinner.hide();
            },
            err => {
                this.spinner.hide();
                console.log("Error occured");
            }
        );
    }
    get username() { return this.login.get('username'); }
    get password() { return this.login.get('password'); }
    ngOnInit(){
        this.login = this.frmBuilder.group({
            username: ["", Validators.required], 
            password: ["", Validators.required], 
        });

        // this.login.valueChanges.subscribe(val => {
        //     this.error = "";
        // });
    }
}
