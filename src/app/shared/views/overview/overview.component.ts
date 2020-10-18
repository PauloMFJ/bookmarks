import { Component, OnDestroy } from '@angular/core';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { environment } from '../../../../environments/environment';
import { FadeAnimation } from '@app/shared/animations/fade.component';
import { StaggerAnimation } from '@app/shared/animations/stagger.component';
import { Pagination } from '@app/shared/models/pagination.model';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  animations: [
     FadeAnimation,
     StaggerAnimation
  ],
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnDestroy {

  /**
   * Pagination size.
   * @type {number}
   */
  private readonly itemsPerPage_ = environment.config.pagination.itemsPerPage;

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
   * If bookmarks are currently being filtered by favourites (true), or not (false).
   * @type {Boolean}
   */
  filterByFavourites = false;

  /**
   * Current value of search bar.
   * @type {string}
   */
  searchTerm: string;

  /**
   * Defines current ordering.
   * @param {string}
   */
  orderBy: string;

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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Method to take a given page, and set new pagination object containing new pagedList.
   * @param {number} page        Current page to paginate on.
   * @param {string=} searchTerm Optional search term used to filter bookmarks with.
   */
  getPagedList(page: number) {
    // Create copy of bookmarks
    let bookmarks = [...this.bookmarks];

    // Filter by favourites
    if (this.filterByFavourites) {
      bookmarks = bookmarks.filter((bookmark) => bookmark.favourited);
    }

    // Filter by searchTerm
    if (this.searchTerm) {
      bookmarks = bookmarks.filter((bookmark) => bookmark.name.includes(this.searchTerm) || bookmark.url.includes(this.searchTerm));
    }

    // Order list
    // TODO: Improve how this is implemented to support both reverse and name sort at same time
    if (this.orderBy === 'reverse') {
      bookmarks.reverse();
    } else if (this.orderBy === 'name') {
      bookmarks.sort((a, b) => a.name > b.name ? 1 : -1);
    }

    // Get pagination
    this.pagination = this.paginationService_.getPagedList(bookmarks, page);
  }

  /**
   * Method used to get and set searchTerm changes.
   * @param {string} searchTerm Search term used to filter bookmarks with.
   */
  onSearchChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.getPagedList(1);
  }

  /**
   * Method used to get and set current order by changes.
   * @param {string} orderBy Current order used to sort bookmarks with.
   */
  onOrderByChanged(orderBy: string) {
    this.orderBy = orderBy;
    this.getPagedList(1);
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
      const bookmark = new Bookmark(`bypaulo.${i + 1}`, 'https://www.bypaulo.design/');

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
