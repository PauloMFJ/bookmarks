import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  /**
   * Constructor used to initialise ResultComponent object.
   * @private {Router} router_ Used to redirect url.
   */
  constructor(private router_: Router) { }

  /**
   * Method to route to overview page.
   */
  routeToOverview(): void {
    this.router_.navigate(['/overview']);
  }
}
