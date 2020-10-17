import { Component } from '@angular/core';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { Bookmark } from '@app/shared/models/bookmark.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {

  /**
   * If bookmarks are currently being filtered by favourites (true), or not (false).
   * @type {Boolean}
   */
  filterByFavourites = false;

  /**
   * Constructor used to initialise OverviewComponent object.
   * @private {BookmarksService} bookmarksService_ Used to handle app bookmarks.
   */
  constructor(private bookmarksService_: BookmarksService) { }

  /**
   * Method to handle and search bookmarks by search change events.
   * @param {string} searchTerm Search term to search bookmarks with.
   */
  onSearchChanged(searchTerm: string) {
    console.log(searchTerm);
  }

  /**
   * Method to toggle and filter bookmarks by favourites only or not.
   */
  toggleFavourites(): void {
    this.filterByFavourites = !this.filterByFavourites;
  }

  /**
   * Method used to load in 10 bookmarks of dummy data.
   */
  loadDummyData(): void {
    const bookmarks = [];
    // Generate 10 dummy data bookmarks
    for (let i = 0; i < 10; i++) {
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
