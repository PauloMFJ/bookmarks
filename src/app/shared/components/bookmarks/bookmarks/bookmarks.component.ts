import { Component, Input, OnDestroy } from '@angular/core';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { Subscription } from 'rxjs';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Pagination } from '@app/shared/models/pagination.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnDestroy {

  /**
   * Full list of bookmarks.
   * @type {Bookmark[]}
   */
  bookmarks: Bookmark[];

  /**
   * Pagination object containing paging information.
   * @type {Pagination}
   */
  pagination: Pagination<Bookmark>;

  /**
   * Bookmarks service subscription.
   * @type {Subscription}
   */
  subscription: Subscription;

  /**
   * Constructor used to initialise BookmarksComponent object.
   * @private {BookmarksService} bookmarksService_ Used to handle app bookmarks.
   */
  constructor(
        private bookmarksService_: BookmarksService,
        private paginationService_: PaginationService<Bookmark>) {
    this.subscription = this.bookmarksService_.getBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
      this.getPagedList(1);
    });
  }

  /**
   * Method used to unsubscribe from used subscription when instance is destroyed.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Method to take a given page, and set new pagination object containing new pagedList.
   * @param {number} page Current page to paginate on.
   */
  getPagedList(page: number) {
    // Get pagination
    this.pagination = this.paginationService_.getPagedList(this.bookmarks, page);
  }

}
