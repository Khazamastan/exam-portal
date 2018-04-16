import { Component, OnInit } from '@angular/core';
import {mockQuestions} from "../../assets/data/mockQuestions";
import { HttpClient } from '@angular/common/http';
import { getapiMapping } from "../../assets/data/apiMapping";
import { CounterService } from "../service/counter.service";

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  questions = [];
  selectedAnswer = "";
  currentQuestion = {};
  questionIndex = 0;
  testCompleted = false;
  testCompletedImage = '';
  mills = 150500;
  constructor(private http : HttpClient,private counter: CounterService) { 
    this.questions = mockQuestions.questions;
    this.currentQuestion = this.questions[0];
    this.testCompletedImage = 'assets/images/completed.jpg';
  }
  getAnswers(){
    var answers = {}
    this.questions.forEach((question) => {
      answers[question._id] = question.selectedAnswer;
     });

     return answers;
  }
  saveAnswer(){
    const body = {
      time :  this.counter.$diff
    };
    const req = this.http.post(apiMapping('saveAnswer'), JSON.stringify(body))
        .subscribe(
            res => {
                debugger;
                console.log(res);
                this.testCompleted = true;
                this.router.navigate(['/login']);
            },
            err => {
                debugger;
                console.log("Error occured");
            }
        );
  }
  submitTest(){
    const body = this.getAnswers();
    const req = this.http.post(apiMapping('saveExampApiUrl'), JSON.stringify(body))
        .subscribe(
            res => {
                debugger;
                console.log(res);
                this.testCompleted = true;
                this.router.navigate(['/login']);
            },
            err => {
                debugger;
                console.log("Error occured");
            }
        );

  }
  setCurrentQuestionIndex($index){
    this.currentQuestion = this.questions[$index];
    this.questionIndex = $index;
    this.selectedAnswer = this.questions[$index].selectedAnswer;
  }
  setCurrentAnswer(id, answer){
    this.questions[this.questionIndex].selectedAnswer = answer;
    this.selectedAnswer = answer;
  }
  ngOnInit() {
    const mills = parseInt(this.mills);
    var minutes = Math.floor(mills / 60000);
    if(!this.counter.$diff){
      this.counter.initCounter(minutes)
    }
    if(this.counter.$diff){
      this.subscription = this.counter.$diff.subscribe((diff) => {
        if(diff === 0){
          this.subscription.unsubscribe();
          this.submitTest();
        }
      });
    }
  }

}
