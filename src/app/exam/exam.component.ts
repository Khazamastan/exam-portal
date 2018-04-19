import { Component, OnInit } from '@angular/core';
import {mockQuestions} from "../../assets/data/mockQuestions";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiMapping } from "../../assets/data/apiMapping";
import { CounterService } from "../service/counter.service";
import {Router} from "@angular/router";
import { AuthenticationService } from '../service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  getTestUrl = 'http://localhost:9009/exam/get-questions';
  questions = [];
  selectedAnswer = "";
  currentQuestion = {};
  questionIndex = 0;
  testCompleted = false;
  testCompletedImage = '';
  mills = 150500;
  loggedInUser;
  subscription;
  error;
  constructor(
    private http : HttpClient,
    private counter: CounterService,
    private router: Router,
    private authService: AuthenticationService
  ) { 
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
    const req = this.http.post(apiMapping.saveAnswer, JSON.stringify(body))
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
    const req = this.http.post(apiMapping.saveExampApiUrl, JSON.stringify(body))
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
  getTest(){
    var authToken = this.loggedInUser.authToken;
    var userInfoID = this.loggedInUser.userInfoID;
    var headers = new HttpHeaders({'Content-Type': 'application/json'}).set('Content-Type', 'application/json');
    const body = {
        userInfoID, 
        authToken
    };
    this.http.post(this.getTestUrl, JSON.stringify(body), {headers})
            .subscribe((res:any) => {
                debugger;
                if(res && res.status){
                }else{
                    this.error = res.errorObject.errorMessage
                }
                console.log(res)
            }, (res:any) => {
                debugger;
                console.log(res);
            })
}
  ngOnInit() {
    const mills = this.mills;
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

    const user = this.authService.getLoggedInUser();
    const role = user.subscribe((data) =>{
      this.loggedInUser = data;
      this.getTest();
    })
  }

}
