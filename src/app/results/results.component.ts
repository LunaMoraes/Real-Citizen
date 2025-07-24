import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { questions } from '../../assets/questions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.less'
})
export class ResultsComponent implements OnInit {
  questions = questions;
  userAnswers: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('userAnswers');
    this.userAnswers = stored ? JSON.parse(stored) : [];
  }

  /** Restart the test */
  restart(): void {
    localStorage.removeItem('userAnswers');
    this.router.navigate(['/']);
  }
}
