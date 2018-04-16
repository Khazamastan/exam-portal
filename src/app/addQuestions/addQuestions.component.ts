import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin',
  templateUrl: './addQuestions.component.html',
  styleUrls: ['./addQuestions.component.scss']
})
export class AdminAddComponent {
    apiUrl = 'http://localhost:9009/admin/saveQuestion';
    answers : FormGroup;
    isSubmitted: boolean = false;
    onSubmit(e){
        this.isSubmitted = true;
        if(!this.answers.valid)
         return;
         
        const body = this.answers.value;

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
    constructor(
        private http : HttpClient,
        private frmBuilder: FormBuilder
    ){ }
    
    ngOnInit(){
        this.answers = this.frmBuilder.group({
            time: ['', Validators.required],
            file: ['', Validators.required],
        });
    }
    get time() { return this.answers.get('time'); }
    get file() { return this.answers.get('file'); }
}
