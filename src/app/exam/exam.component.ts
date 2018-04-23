import { Component, OnInit } from '@angular/core';
import { mockQuestions } from "../../assets/data/mockQuestions";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiMapping } from "../../assets/data/apiMapping";
import { CounterService } from "../service/counter.service";
import { Router } from "@angular/router";
import { AuthenticationService } from '../service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent
 implements OnInit {
  scrollConfig = {
    suppressScrollX: true
  };
  getTestUrl = 'http://localhost:9009/exam/get-questions';
  submitQuestionUrl = 'http://localhost:9009/exam/submit-question';
  submitTestUrl = 'http://localhost:9009/exam/submit-test';
  questions = [];
  selectedAnswer = "";
  currentQuestion;
  remainingTime: number;
  questionIndex = 0;
  testCompleted = false;
  testCompletedImage = '';
  mills = 0;
  loggedInUser;
  subscription;
  error;
  started;
  headers;
  constructor(
    private http: HttpClient,
    private counter: CounterService,
    private router: Router,
    private authService: AuthenticationService,
    private spinner: Ng4LoadingSpinnerService,
  ) {
    this.testCompletedImage = 'assets/images/completed.jpg';
  }
  getAnswers() {
    var answers = []
    this.questions.forEach((question) => {
      answers.push({ questionId: question.questionId, answerId: question.answerId });;
    });

    return answers;
  }
  saveAnswer() {
    const questionId = this.currentQuestion.questionId;
    const answerId = this.questions[this.questionIndex].answerId;
    const body = {
      questionId: questionId,
      answerId: answerId || "",
      time: this.remainingTime
    };
    const headers = this.authService.getHeaders();

    const req = this.http.post(this.submitQuestionUrl, JSON.stringify(body), { headers })
      .subscribe(
        res => {

        },
        err => {

          console.log("Error occured");
        }
      );
  }
  submitTest() {
    const body = this.getAnswers();
    const headers = this.authService.getHeaders();
    this.spinner.show();
    const req = this.http.post(this.submitTestUrl, JSON.stringify(body), { headers })
      .subscribe((res: any) => {
        console.log(res);
        if (res && res.status) {
          this.testCompleted = true;
        }
        this.spinner.hide();
      },
        err => {
          this.spinner.hide();
          console.log("Error occured");
        }
      );

  }
  setCurrentQuestionIndex($index) {
    this.currentQuestion = this.questions[$index];
    this.questionIndex = $index;
    this.selectedAnswer = this.questions[$index].answerId;
    this.saveAnswer();
  }
  setCurrentAnswer(id, answer) {
    this.questions[this.questionIndex].answerId = answer;
    this.currentQuestion.answerId = answer;
    this.selectedAnswer = answer;
    this.saveAnswer();
  }
  startTest(questionsList) {
    var questions = [];
    Object.keys(questionsList).forEach((subject) => {
      var subjectQuestions = (questionsList[subject]);
      if (Array && Array.isArray(subjectQuestions)) {
        subjectQuestions = subjectQuestions.splice(0, 25);
        if (subjectQuestions && subjectQuestions.length)
          questions = questions.concat(subjectQuestions);
      }
    });

    this.started = true;
    this.questions = questions.filter((question) => {
      if (question.questionId) {
        return question;
      }
    })
    var index = 0;
    var currentQuestion = this.questions.forEach((question, i) => {
      if (questionsList.currentQuestionId == question.questionId) {
        index = i;
      }
    });
    this.setCurrentQuestionIndex(index);
    debugger;
    var time = parseInt(localStorage.getItem('timeElapsed'));
    if (time || questionsList.timeRemaining)
      this.startCounter(time || questionsList.timeRemaining)
  }
  getTest() {
    const headers = this.authService.getHeaders();
    this.spinner.show()
    this.http.post(this.getTestUrl, JSON.stringify({}), { headers })
      .subscribe((res: any) => {
        if (res && res.status) {
          if (res.result) {
            if (res.result.status == "COMPLETED") {
              this.testCompleted = true;
            } else {
              this.startTest(res.result);
            }
          } else {
            if (res.errorObject)
              this.error = res.errorObject.errorMessage
          }
          this.spinner.hide();
        }
        console.log(res)
      }, (res: any) => {
        this.spinner.hide();
        console.log(res);
      })
  }
  startCounter(timeElapsed) {
    if (timeElapsed == 3600000) {
      timeElapsed = 0;
    }
    const timeRem = parseInt(timeElapsed);
    this.mills = (3600000 - timeRem);
    var minutes = Math.floor(this.mills / 60000);
    if (!this.counter.$diff) {
      this.counter.initCounter(minutes)
    }
    if (this.counter.$diff) {
      this.subscription = this.counter.$diff.subscribe((diff) => {
        this.remainingTime = diff;
        console.log(diff%60000)
        localStorage && localStorage.setItem("timeElapsed", JSON.stringify(diff));
        if (diff%60000 == 0) {
          debugger;
          this.saveAnswer();
        }
        if (diff === 0) {
          this.subscription.unsubscribe();
          this.submitTest();
        }
      });
    }
  }
  ngOnInit() {
    const user = this.authService.getLoggedInUser();
    const role = user.subscribe((data) => {
      this.loggedInUser = data;
      this.getTest();
    })
  }

}
