import { Component } from '@angular/core';
import {NewUser} from "./register";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    newUser: NewUser ={
        firstName : '',
        lastName : '',
        email : '',
        password : '',
        branch : '',
        phone : '',
        course : ''
    };
    courses = [{
        name : "B.Tech",
        id: "btech"
    },{
        name : "MCA",
        id: "mca"
    }];

    branches = [{
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
    onSubmit(e){
        //TODO : Do login here.
    }
    constructor(){

    }
    ngOnInit(){

    }
}
