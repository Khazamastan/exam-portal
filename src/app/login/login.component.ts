import { Component } from '@angular/core';
import {Login} from "./login";
import { HttpClient } from '@angular/common/http';
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
        
        const body = this.login.value;
        const req = this.http.post(this.apiUrl, JSON.stringify(body))
        .subscribe(
            res => {
                debugger;
                console.log(res);
                this.router.navigate(['/exam']);
            },
            err => {
                debugger;
                console.log("Error occured");
                this.router.navigate(['/user/register']);
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
    }
}
