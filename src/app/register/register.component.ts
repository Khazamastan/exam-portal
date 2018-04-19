import { Component, Injectable } from '@angular/core';
import {NewUser} from "./register";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, RequestOptions, Headers, URLSearchParams} from '@angular/http'

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
    constructor(private http : HttpClient, private frmBuilder: FormBuilder){}
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

    //     var options = {
    //         headers: { 'Content-Type': 'application/json' }
    //     };
    //    this.http.post(
    //        this.apiUrl,
    //        JSON.stringify(body),
    //        options
    //    ).subscribe();


    let opt: RequestOptions
    var headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Content-Type', 'application/json');

    this.http.post(this.apiUrl, JSON.stringify(body), {headers: headers})
        .subscribe(data => {
            debugger;
            console.log(data)
        }, data => {
            debugger;
            console.log(data)
        })



       /*  var headers = new HttpHeaders();
        headers.append("Content-Type", 'application/json');
        
        const options = {
            headers: headers,
            body : body,
            method : 'Post'
          };

        const req = this.http.post(this.apiUrl, JSON.stringify(body), { headers: headers})
        .subscribe(
            res => {
                debugger;
            console.log(res);
            },
            err => {
                debugger;
            console.log("Error occured");
            }
        ); */
    }
}
