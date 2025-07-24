import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { questions } from '../../assets/questions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.less'
})
export class TestComponent implements OnInit {
  questions = questions;
  currentIndex = 0;
  userAnswer = '';
  answers: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize if needed
  }

  /** Save answer and proceed */
  next(): void {
    this.answers.push(this.userAnswer);
    this.userAnswer = '';
    this.currentIndex++;
    if (this.currentIndex >= this.questions.length) {
      // Save to localStorage and navigate to results
      localStorage.setItem('userAnswers', JSON.stringify(this.answers));
      this.router.navigate(['/results']);
    }
  }
}
