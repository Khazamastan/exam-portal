import { Component, OnInit } from '@angular/core';
import {mockQuestions} from "../../assets/data/mockQuestions";

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
  constructor() { 
    this.questions = mockQuestions.questions;
    this.currentQuestion = this.questions[0];
    this.testCompletedImage = 'assets/images/completed.jpg';
  }
  submitTest(){
    this.testCompleted = true;
  }
  setCurrentQuestionIndex($index){
    this.currentQuestion = this.questions[$index];
    this.questionIndex = $index;
    this.selectedAnswer = "";
  }
  setCurrentAnswer(id, answer){
    this.selectedAnswer = answer;
  }
  ngOnInit() {
  }

}
