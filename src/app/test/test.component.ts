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
  allQuestions = questions; // Keep reference to all questions
  questions: any[] = []; // Selected random questions for this test
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
    // Always start fresh - reset everything when starting a new test
    this.resetTest();
  }

  // Reset the test to initial state
  resetTest(): void {
    this.currentIndex = 0;
    this.finished = false;
    // Select 10 random questions from all available questions
    this.questions = this.selectRandomQuestions(this.allQuestions, 10);
    this.answers = new Array(this.questions.length).fill('');
    localStorage.removeItem('answers'); // Clear any saved progress
    // Save selected questions for results page
    localStorage.setItem('selectedQuestions', JSON.stringify(this.questions));
  }

  // Helper method to select random questions
  selectRandomQuestions(allQuestions: any[], count: number): any[] {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, allQuestions.length));
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
    // Progress is based on current question index, not saved answers
    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }
}
