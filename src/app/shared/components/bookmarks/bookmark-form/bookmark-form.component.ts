import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})
export class BookmarkFormComponent {

  /**
   * New empty bookmark object.bookmark
   * @type {Bookmark}
   */
  bookmark = new Bookmark();

  /**
   * FormGroup object used to create new bookmark.
   * @type {FormGroup}
   */
  formGroup: FormGroup;

  /**
   * Constructor used to initialise BookmarkFormComponent object.
   * @private {BookmarksService} bookmarksService_ Used to handle app bookmarks.
   * @private {BookmarksService} formBuilder_      Used to generate new bookmark form.
   * @private {Router} router_                     Used to redirect url.
   */
  constructor(
      private bookmarksService_: BookmarksService,
      private formBuilder_: FormBuilder,
      private router_: Router) {
    this.formGroup = this.bookmark.getForm(this.formBuilder_);
  }

  /**
   * Method used to submit and save new bookmark.
   */
  submit(): void {
    // If form's valid, save
    if (this.formGroup.valid) {
      this.bookmark.from(this.formGroup);
      this.bookmarksService_.add(this.bookmark);
      this.router_.navigate(['/result', this.bookmark.id]);
    }
    // TODO: Implement else error handling
  }

}
