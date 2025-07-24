import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { questions } from '../../assets/questions';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './results.component.html',
  styleUrl: './results.component.less'
})
export class ResultsComponent implements OnInit {
  questions = questions;
  userAnswers: string[] = [];

  ngOnInit(): void {
    // Load the user's answers from localStorage
    const savedAnswers = localStorage.getItem('answers');
    if (savedAnswers) {
      this.userAnswers = JSON.parse(savedAnswers);
    }
  }

  // Method to clear localStorage and restart
  restartTest(): void {
    localStorage.removeItem('answers');
  }
}
