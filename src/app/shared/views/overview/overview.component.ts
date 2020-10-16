import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../models/bookmark.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

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

}
