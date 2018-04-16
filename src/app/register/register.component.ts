import { Component, Injectable } from '@angular/core';
import {NewUser} from "./register";
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})

@Injectable()
export class RegisterComponent {
    apiUrl = 'http://localhost:9009/user/register'
    newUser : FormGroup
    courses = [{
        name : "Computer Science Engineering",
        id: "cse"
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
    constructor(private http : HttpClient, private frmBuilder: FormBuilder){}
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
        if(!this.newUser.valid)
         return;
         
        const body = this.newUser.value;

        const req = this.http.post(this.apiUrl, JSON.stringify(body))
        .subscribe(
            res => {
                debugger;
            console.log(res);
            },
            err => {
                debugger;
            console.log("Error occured");
            }
        );
    }
}
