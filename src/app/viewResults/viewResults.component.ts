import { Component } from '@angular/core';

 var results =
[
  {
    name: "Earl of Lemongrab",
    "_id" : 1, 
    college: "cmrit",
    course : "cse",
    score : 80
  },
  {
    name: "Phoebe",
    "_id" : 2, 
    college: "cmrit",
    course : "cse",
    score : 80
  },
  {
    name: "Bonnibel Bubblegum",
    "_id" : 3, 
    college: "cmrit",
    course : "cse",
    score : 80
  },
  {
    name: "Lumpy Space Princess",
    "_id" : 4, 
    college: "cmrit",
    course : "cse",
    score : 80
  },
];

results = results.concat(results);
results = results.concat(results);
results = results.concat(results);
results = results.concat(results);
results = results.concat(results);

@Component({
  selector: 'app-admin',
  templateUrl: './viewResults.component.html',
  styleUrls: ['./viewResults.component.scss']
})
export class AdminResultsComponent {
    results = results;
    onSubmit(e){
        //TODO : Do login here.
    }
    constructor(){

    }
    ngOnInit(){

    }
}
