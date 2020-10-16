import { Component, Input } from '@angular/core';
import { Bookmark } from '@app/shared/models/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {

  /**
   * List of bookmarks to render.
   */
  @Input() bookmarks: Bookmark[];

  constructor() { }

}
