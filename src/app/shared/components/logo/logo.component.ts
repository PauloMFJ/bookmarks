import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  constructor(private router: Router) { }

  /**
   * Route to overview page.
   */
  routeToHome = () => this.router.navigate(['/overview']);

}
