import { Component, OnDestroy } from '@angular/core';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { environment } from '../../../../environments/environment';
import { Pagination } from '@app/shared/models/pagination.model';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnDestroy {

  /**
   * Pagination size.
   * @type {number}
   */
  private readonly itemsPerPage_ = environment.config.pagination.itemsPerPage;

  /**
   * If bookmarks are currently being filtered by favourites (true), or not (false).
   * @type {Boolean}
   */
  filterByFavourites = false;

  /**
   * Full List of bookmarks.
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
   * Constructor used to initialise OverviewComponent object.
   * @private {BookmarksService} bookmarksService_   Used to handle app bookmarks.
   * @private {PaginationService} paginationService_ Used to get paged bookmarks list.
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
  getPagedList(page: number, searchTerm?: string) {
    // Create copy of bookmarks
    let bookmarks = this.bookmarks;

    // Filter by favourites
    if (this.filterByFavourites) {
      bookmarks = bookmarks.filter((bookmark) => bookmark.favourited);
    }

    // Filter by searchTerm
    if (searchTerm) {
      bookmarks = this.bookmarks.filter((bookmark) => bookmark.name.includes(searchTerm) || bookmark.url.includes(searchTerm));
    }

    // Get pagination
    this.pagination = this.paginationService_.getPagedList(bookmarks, page);
  }

  /**
   * Method to handle and search bookmarks by search change events.
   * @param {string} searchTerm Search term to search bookmarks with.
   */
  onSearchChanged(searchTerm: string) {
    this.getPagedList(1, searchTerm);
  }

  /**
   * Method to toggle and filter bookmarks by favourites only or not.
   */
  toggleFavourites(): void {
    this.filterByFavourites = !this.filterByFavourites;
    this.getPagedList(1);
  }

  /**
   * Method used to load in x dummy data bookmarks of page size.
   */
  loadDummyData(): void {
    const bookmarks = [];
    // Generate page size dummy data bookmarks
    for (let i = 0; i < this.itemsPerPage_; i++) {
      // Create dummy data bookmark
      const bookmark = new Bookmark('bypaulo.', 'https://www.bypaulo.design/');

      // Randomize id
      bookmark.id = `${bookmark.id}${i}`;

      // Push bookmark to list
      bookmarks.push(bookmark);
    }

    // Save bookmarks
    this.bookmarksService_.add(bookmarks);

  }

  /**
   * Method to delete all bookmarks.
   */
  deleteAll(): void {
    this.bookmarksService_.deleteAll();
  }

}
