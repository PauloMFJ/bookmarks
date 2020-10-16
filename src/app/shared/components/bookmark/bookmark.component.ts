import { Component, Input } from '@angular/core';
import { Bookmark } from '@app/shared/models/bookmark.model';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent {

  /**
   * Bookmark object to render.
   */
  @Input() bookmark: Bookmark;

  constructor() { }

}
