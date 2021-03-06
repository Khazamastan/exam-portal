import { Component, Injectable } from '@angular/core';
import {NewUser} from "./register";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

import "rxjs/add/operator/map";
import { FormGroup, FormBuilder, Validators,FormControl  } from '@angular/forms';
import { AuthenticationService, _site } from '../service';
import { PasswordValidation } from './password-validation';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})

@Injectable()
export class RegisterComponent {
    apiUrl = `${_site}/user/register`;
    newUser : FormGroup
    registered: boolean = false;
    loggedInUser;
    courses = [{
        name : "Computer Science Engineering",
        id: "CSE"
    },{
        name : "Electronics and Communication Engineering",
        id: "ECE"
    },{
        name : "Electrical engineering",
        id: "EEE"
    },{
        name : "Mechanical Engineering",
        id: "MECHANICAL"
    },{
        name : "Arthimetics",
        id: "ARTHIMETICS"
    },{
        name : "Reasoning",
        id: "REASONING"
    },{
        name : "English",
        id: "ENGLISH"
    },
    {
        name : "MBA",
        id: "MBA"
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
            name:['', Validators.required],
            collegeCode:['', Validators.required],
            email:['',
                [
                    Validators.required,
                    Validators.pattern("[^ @]*@[^ @]*")
                ]
            ],
            password: ['',
                [
                    Validators.minLength(8),
                    Validators.required
                ]
            ],
            confirmPassword: ['',
                [
                    Validators.minLength(8), 
                    Validators.required
                ]
            ],
            mobileNumber :['',
                [
                    Validators.minLength(10),
                    Validators.required
                ]
            ],
            course: ['', Validators.required]

        },
        {
            validator: PasswordValidation.MatchPassword // your validation method
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
    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
            control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
            this.validateAllFormFields(control);            //{6}
            }
        });
    }
    onSubmit(){

        this.isSubmitted = true;
        if(!this.newUser.dirty || !this.newUser.valid){
            this.validateAllFormFields(this.newUser);
            return;
        }
         
        var body = this.newUser.value;
        body.email = body.email.toLowerCase();


    var headers = this.authService.getHeaders();
    this.spinner.show();
    this.http.post(this.apiUrl, JSON.stringify(body), {headers})
        .subscribe((data:any) => {
            debugger;
            if(data && data.status){
                console.log("Success");
                this.registered = true;
                setTimeout(() => {
                    this.router.navigate(['/user/login']);
                }, 5000)
            }else{
                this.error = data.errorObject.errorMessage
            }
            console.log("Success");
            this.spinner.hide();
        }, (err:any) => {
            this.spinner.hide();
            console.log(err);
        })
    }
}
