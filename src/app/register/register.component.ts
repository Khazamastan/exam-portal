import { Component, Injectable } from '@angular/core';
import {NewUser} from "./register";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

import "rxjs/add/operator/map";
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AuthenticationService } from '../service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})

@Injectable()
export class RegisterComponent {
    apiUrl = 'http://localhost:9009/user/register';
    newUser : FormGroup
    registered: boolean = false;
    loggedInUser;
    courses = [{
        name : "Computer Science Engineering",
        id: "CSE"
    },{
        name : "Electronics and Communication Engineering",
        id: "ece"
    },{
        name : "Electrical engineering",
        id: "ee"
    },{
        name : "Mechanical Engineering",
        id: "me"
    },{
        name : "Information Technology Engineering",
        id: "it"
    },{
        name : "Civil Engineering",
        id: "ce"
    },{
        name : "Chemical Engineering",
        id: "che"
    }];
    isSubmitted: boolean = false;
    error;
    constructor(
        private http : HttpClient,
        private frmBuilder: FormBuilder,
        private router: Router, 
        private authService: AuthenticationService,
        private spinner: Ng4LoadingSpinnerService,
    ){}
    ngOnInit(){
        this.newUser = this.frmBuilder.group({
            name:['1', Validators.required],
            collegeCode:['1', Validators.required],
            email:['1@gmail.com',
                [
                    Validators.required,
                    Validators.pattern("[^ @]*@[^ @]*")
                ]
            ],
            password: ['1',
                [
                    Validators.minLength(8), 
                    Validators.required
                ]
            ],
            confirmPassword: ['1',
                [
                    Validators.minLength(8), 
                    Validators.required
                ]
            ],
            mobileNumber :['7207810602',
                [
                    Validators.minLength(10),
                    Validators.required
                ]
            ],
            course: ['CSE', Validators.required]

        });

        this.newUser.valueChanges.subscribe(val => {
            this.error = "";
        });
    }
    get name() { return this.newUser.get('name'); }
    get collegeCode() { return this.newUser.get('collegeCode'); }
    get email() { return this.newUser.get('email'); }
    get password() { return this.newUser.get('password'); }
    get mobileNumber() { return this.newUser.get('mobileNumber'); }
    get course() { return this.newUser.get('course'); }
    get confirmPassword() { return this.newUser.get('confirmPassword'); }
    
    onSubmit(){

        this.isSubmitted = true;
        if(this.newUser.dirty && this.newUser.errors)
         return;
         
        var body = this.newUser.value;


    var headers = this.authService.getHeaders();
    this.spinner.show();
    this.http.post(this.apiUrl, JSON.stringify(body), {headers})
        .subscribe((data:any) => {
            debugger;
            if(data && data.status){
                console.log(data);
                this.registered = true;
                setTimeout(() => {
                    this.router.navigate(['/user/login']);
                }, 5000)
            }else{
                this.error = data.errorObject.errorMessage
            }
            console.log(data)
            this.spinner.hide();
        }, (res:any) => {
            this.spinner.hide();
            console.log(res);
        })
    }
}
