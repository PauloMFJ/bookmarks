import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnDestroy {

  /**
   * Created bookmark object.
   * @type {Bookmark}
   */
  bookmark: Bookmark;

  /**
   * Activated route subscription.
   * @type {Subscription}
   */
  subscription: Subscription;

  /**
   * Constructor used to initialise ResultComponent object.
   * @private {ActivatedRoute}   activatedRoute_   Used to get route information/
   * @private {BookmarksService} bookmarksService_ Used to handle app bookmarks.
   * @private {Router}           router_           Used to redirect url.
   */
  constructor(
      private activatedRoute_: ActivatedRoute,
      private bookmarksService_: BookmarksService,
      private router_: Router) {
    this.subscription = this.activatedRoute_.params.subscribe((params) => {
      // Find bookmark based on current router id, and set it, else if bookmark is
      //     not set (ie. bookmark not found), route to page-not-found.
      if (!(this.bookmark = this.bookmarksService_.find(params.id))) {
        this.router_.navigate(['/page-not-found']);
      }
    });
  }

  /**
   * Method used to unsubscribe from used subscription when instance is destroyed.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Method to route to overview page.
   */
  routeToOverview(): void {
    this.router_.navigate(['/overview']);
  }
}
