import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from '@app/shared/models/bookmark.model';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  /**
   * bookmark - Input bookmark objects[] to render.
   */
  @Input() bookmarks: Bookmark[];

  constructor() { }

  ngOnInit() { }

}
