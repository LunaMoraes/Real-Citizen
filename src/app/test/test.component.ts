import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- IMPORT FormsModule for ngModel
import { questions } from '../../assets/questions';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule, ResultsComponent], // <-- ADD FormsModule here
  templateUrl: './test.component.html',
  styleUrl: './test.component.less'
})
export class TestComponent implements OnInit {
  questions = questions;
  answers: string[] = []; // Array to hold all user answers
  currentIndex = 0;
  finished = false;

  // This property is bound to the textarea using ngModel
  get currentAnswer(): string {
    return this.answers[this.currentIndex] || '';
  }
  set currentAnswer(value: string) {
    this.answers[this.currentIndex] = value;
  }

  // On component load, get saved answers from localStorage
  ngOnInit(): void {
    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
      this.answers = JSON.parse(savedAnswers);
    } else {
      // If no saved answers, create an empty array
      this.answers = new Array(this.questions.length).fill('');
    }
  }

  // Save current answer and move to the next question
  nextQuestion(): void {
    this.saveAnswers();
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.finished = true;
    }
  }

  // Move to the previous question
  previousQuestion(): void {
    this.saveAnswers(); // Also save when going back
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // Helper function to save the answers array to localStorage
  saveAnswers(): void {
    localStorage.setItem('answers', JSON.stringify(this.answers));
  }

  // For the progress bar visual
  get progress(): number {
    // Progress is based on the farthest question answered
    const lastAnswered = this.answers.map(a => a.trim() !== '').lastIndexOf(true);
    return ((lastAnswered + 1) / this.questions.length) * 100;
  }
}
