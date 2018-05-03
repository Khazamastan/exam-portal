import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService, _site } from '../service';

@Component({
  selector: 'app-admin',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AdminAddComponent {
    apiUrl = `${_site}/exam/uploadExcel`;
    answers: FormGroup;
    isSubmitted: boolean = false;
    fileToUpload: File;
    constructor(
        private http : HttpClient,
        private frmBuilder: FormBuilder,
        private spinner: Ng4LoadingSpinnerService,
        private authService: AuthenticationService
    ){ }
    onSubmit(e){
        this.isSubmitted = true;
        if(!this.answers.valid)
         return;
         var headers = this.authService.getHeadersMulti();

        const formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        this.spinner.show();
        const req = this.http.post(this.apiUrl, formData, {headers})
        .subscribe(
            (res:any) => {
                this.spinner.hide();
                console.log("Success");
            },
            err => {
                this.spinner.hide();
                console.log("Error occured", err);
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