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
   * Method used to submit and save new bookmark.
   */
  submit(): void {
    if (this.formGroup.valid) {
      this.bookmark.from(this.formGroup);

      // Get url using no-cors mode
      fetch(this.bookmark.url, { mode: 'no-cors' })
        .then((response) => {
          // If success
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
            this.formGroup.controls['url'].setErrors({ 'invalidurl': true });
          }
        })
        .catch((error) => console.log('Url Fetch Error: ', error));
    }
  }

}
