import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent {

  /**
   * Bookmark object to render.
   * @type {Bookmark}
   */
  @Input() bookmark: Bookmark;

  /**
   * Event emitter used to listen to deleted events.
   * @param {boolean} deleted Emits 'true' on delete event.
   */
  @Output() deleted = new EventEmitter<boolean>();

  /**
   * Constructor used to initialise BookmarkComponent object.
   * @private {BookmarksService} bookmarksService_ Used to handle app bookmarks.
   */
  constructor(private bookmarksService_: BookmarksService) { }

  /**
   * Method used to navigate user to bookmark url.
   */
  navigateToUrl() {
    console.log(this.bookmark.url);
  }

  /**
   * Method to update this bookmarks favourited state.
   */
  favourite() {
    // Toggle state and update
    this.bookmark.favourited = !this.bookmark.favourited;
    this.bookmarksService_.update(this.bookmark.id, this.bookmark);
  }

  edit() {
    console.log('Edit!');
  }

  /**
   * Method to permanently delete this bookmark.
   */
  delete() {
    this.bookmarksService_.delete(this.bookmark.id);

    // Emit deleted event
    this.deleted.emit(true);
  }

}
