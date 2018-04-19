import { Component } from '@angular/core';
import {Login} from "./login";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../service';


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
        private authService: AuthenticationService
    ) { }
    onSubmit(){
        this.isSubmitted = true;
        if(!this.login.valid)
         return;
        
        var headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Content-Type', 'application/json');
        const body = this.login.value;
        const req = this.http.post(this.apiUrl, JSON.stringify(body), {headers})
        .subscribe(
            (res:any) => {
                debugger;
                if(res && res.status){
                    console.log(res);
                    this.router.navigate(['/exam']);
                }else{
                    this.error = "Unable to Login"
                }
            },
            err => {
                debugger;
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

        this.login.valueChanges.subscribe(val => {
            this.error = "";
        });
    }
}
