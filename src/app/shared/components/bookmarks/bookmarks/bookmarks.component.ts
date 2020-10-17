import { Component, Input } from '@angular/core';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {

  /**
   * List of bookmarks.
   * @type {Bookmark[]}
   */
  bookmarks: Bookmark[];

  /**
   * Constructor used to initialise BookmarksComponent object.
   * @private {BookmarksService} bookmarksService_ Used to handle app bookmarks.
   */
  constructor(private bookmarksService_: BookmarksService) {
    this.bookmarksService_.getBookmarks().subscribe((bookmarks) => {
      // Convert JSON to bookmarks object list
      this.bookmarks = plainToClass(Bookmark, bookmarks as object[]);
    });
  }

}
