import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.less'
})
export class LandingComponent {
  constructor(private router: Router) {}

  /** Navigate to the test component */
  start(): void {
    this.router.navigate(['/test']);
  }
}
