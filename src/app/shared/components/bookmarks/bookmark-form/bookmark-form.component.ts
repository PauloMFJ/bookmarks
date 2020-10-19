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
   * Used to prevent the user from submitting multiple enteries during submit().
   * @type {string}
   */
  waitingForResponse = false;

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
    // Prevent user from submitting again, until this method completes
    this.waitingForResponse = true;

    // Create new bookmark and pass formGroup into it (Dont set current one, till it passes)
    const bookmark = new Bookmark();
    bookmark.from(this.formGroup);

    // Else, if name string only has whitespaces, show error
    if (!bookmark.name.trim()) {
      this.logWhitespacesError_('name');
    }

    // Check if url already exists
    const existingBookmark = this.bookmarksService_.exists(bookmark.url);
    if (existingBookmark) {

      // Log error if not editing form with same url as match
      if ((this.exists && this.bookmark.url !== existingBookmark.url) ||

          // Or, if new form, and existing url is same as form url, show matching url error
          (!this.exists && bookmark.url === existingBookmark.url)) {
        this.logAlreadyExistsError_('url');
      }
    }

    // If form is still valid, check if url exists (post to url and then handle response)
    if (this.formGroup.valid) {
      fetch(bookmark.url, {
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
              this.bookmarksService_.add(bookmark);
              this.router_.navigate(['/result', bookmark.id]);
            }

            // Else, update existing bookmark with new changes
            else {
              this.bookmark.from(this.formGroup);
              this.bookmarksService_.update(this.bookmark.id, this.bookmark, true);
            }
          }

          // Else url log error
          else {
            this.logUrlError_('url');
          }

          // Fetch finished, so update state
          this.waitingForResponse = false;
        })
        .catch((error) => {
          this.logUrlError_('url');

          // Form failed, so update state
          this.waitingForResponse = false;
        });
    } else {
      this.waitingForResponse = false;
    }
  }

  /**
   * Method used to log a already exists error to form.
   * @param {string} control Control to show error on.
   */
  private logWhitespacesError_(control: string) {
      this.formGroup.controls[control].setErrors({ whitespaces: true });
  }

  /**
   * Method used to log a already exists error to form.
   * @param {string} control Control to show error on.
   */
  private logAlreadyExistsError_(control: string) {
      this.formGroup.controls[control].setErrors({ alreadyExists: true });
  }

  /**
   * Method used to log a url error to form.
   * @param {string} control Control to show error on.
   */
  private logUrlError_(control: string) {
    this.formGroup.controls[control].setErrors({ invalidurl: true });
  }

}
