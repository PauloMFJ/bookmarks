import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  /**
   * If bookmarks are currently being filtered by favourites (true), or not (false).
   * @type {Boolean}
   */
  filterByFavourites = false;

  /**
   * bookmarks - TODO: Connect to real services, temporarily using dummy data for testing.
   */
  bookmarks = [
      new Bookmark(0, 'https://www.bypaulo.design/', 'bypaulo.'),
      new Bookmark(1, 'https://www.bypaulo.design/', 'bypaulo.', true),
      new Bookmark(2, 'https://www.bypaulo.design/', 'bypaulo.'),
  ];

  constructor() { }

  ngOnInit() { }

  /**
   * Method to handle and search bookmarks by search change events.
   * @param {string} searchTerm Search term to search bookmarks with.
   */
  onSearchChanged(searchTerm: string) {
    console.log(searchTerm);
  }

  /**
   * Method to add new bookmark.
   */
  addNew() {
    console.log('New!');
  }

  /**
   * Method to toggle and filter bookmarks by favourites only or not.
   */
  toggleFavourites = () => this.filterByFavourites = !this.filterByFavourites;

  /**
   * Method to delete all bookmarks.
   */
  deleteAll() {
    console.log('Deleted!');
  }

}
