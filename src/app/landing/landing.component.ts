import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.less'
})
export class LandingComponent {
  // Inject the Router to allow navigation
  constructor(private router: Router) {}

  // This method is called by the button click and navigates to the '/test' route
  startTest(): void {
    this.router.navigate(['/test']);
  }
}
