import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookmarksService } from '@app/shared/services/bookmarks/bookmarks.service';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})
export class BookmarkFormComponent implements OnInit {

  /**
   * URL error message string.
   * @type {string}
   */
  urlErrorMessage: string;

  /**
   * Used to define if bookmark existed before form or not, DEFAULTS to 'false'.
   * @type {Boolean}
   */
  exists = false;

  /**
   * Bookmark object used.
   * @type {Bookmark}
   */
  @Input() bookmark: Bookmark;

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
      private router_: Router) { }

  /**
   * ngOnInit after Inputs have loaded, allows to create a new bookmark, or create
   *     formGroup based on input.
   */
  ngOnInit(): void {
    // If bookmark doesn't exist create new empty one
    if (!this.bookmark) {
      this.bookmark = new Bookmark();
    } else {
      // Update exists state
      this.exists = true;
    }

    // Get formGroup from current bookmark
    this.formGroup = this.bookmark.getForm(this.formBuilder_);
  }

  /**
   * Method used to submit and save new bookmark if form is valid, else sets form control
   *     errors based on validation.
   */
  submit(): void {
    this.bookmark.from(this.formGroup);

    // Else, if name string only has whitespaces, show error
    if (!this.bookmark.name.trim()) {
      this.formGroup.controls['name'].setErrors({'whitespaces': true });
    }

    // If url already exists in app, and not editing existing url with same form url, show error
    const bookmark = this.bookmarksService_.exists(this.bookmark.url);
    if (!this.exists && bookmark && bookmark.url === this.bookmark.url) {
      this.formGroup.controls['url'].setErrors({ 'alreadyExists': true });
    }

    // If form is still valid, check if url exists
    if (this.formGroup.valid) {
      fetch(this.bookmark.url, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          mode: 'no-cors'
        }).then((response) => {
          // If response status was a success
          if (response.status === 200 || response.status === 0) {

            // Add bookmark, and route to result page if bookmark didn't exist beforehand
            if (!this.exists) {
              this.bookmarksService_.add(this.bookmark);
              this.router_.navigate(['/result', this.bookmark.id]);
            }

            // Else, update existing bookmark with new changes
            else {
              this.bookmarksService_.update(this.bookmark.id, this.bookmark, true);
            }
          }

          // Else log error
          else {
            this.logUrlError();
          }
        })
        .catch((error) => {
          this.logUrlError();
        });
    }
  }

  /**
   * Method used to log a url error to form.
   */
  logUrlError() {
    this.formGroup.controls['url'].setErrors({ 'invalidurl': true });
  }

}
