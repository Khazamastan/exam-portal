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
        phone : 0,
        course : ''
    };
    onSubmit(e){
        //TODO : Do login here.
    }
    constructor(){

    }
    ngOnInit(){

    }
}
