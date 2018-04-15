import { Component } from '@angular/core';
import {Login} from "./login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    login: Login ={
        username: "",
        password: ""
    };
    onSubmit(e){
        //TODO : Do login here.
    }
    constructor(){

    }
    ngOnInit(){

    }
}
