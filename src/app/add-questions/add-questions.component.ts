import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-admin',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AdminAddComponent {
    apiUrl = 'http://localhost:9009/exam/uploadExcel';
    answers: FormGroup;
    isSubmitted: boolean = false;
    fileToUpload: File;
    constructor(
        private http : HttpClient,
        private frmBuilder: FormBuilder,
        private spinner: Ng4LoadingSpinnerService,
    ){ }
    onSubmit(e){
        this.isSubmitted = true;
        if(!this.answers.valid)
         return;
         
        const formData: FormData = new FormData();
        formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
        this.spinner.show();
        const req = this.http.post(this.apiUrl, formData)
        .subscribe(
            (res:any) => {
                this.spinner.hide();
                console.log(res);
            },
            err => {
                this.spinner.show();
                console.log("Error occured");
            }
        );
    }
    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }
    ngOnInit(){
        this.answers = this.frmBuilder.group({
            // time: ['', Validators.required],
            file: ['', Validators.required],
        });
    }
    // get time() { return this.answers.get('time'); }
    get file() { return this.answers.get('file'); }
}
