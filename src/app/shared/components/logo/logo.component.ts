import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  /**
   * Constructor used to initialise LogoComponent object.
   * @private {Router} router_ Used to redirect url.
   */
  constructor(private router_: Router) { }

  /**
   * Method to route to overview page.
   */
  routeToHome(): void {
    this.router_.navigate(['/overview']);
  }

}
