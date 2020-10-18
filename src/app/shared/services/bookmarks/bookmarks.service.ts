import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/shared/services/local-storage/local-storage.service';
import { Bookmark } from '@app/shared/models/bookmark.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  /**
   * List of stored bookmarks.
   * @private {Bookmark[]}
   */
  private bookmarks_: Bookmark[];

  /**
   * Bookmarks subject used to store local app bookmarks, behaviour varient used
   *     as by default it always returns data on subscribe() events.
   *     On load DEFAULTS to an empty array.
   * @private {BehaviorSubject}
   */
  private bookmarksSubject_ = new BehaviorSubject<Bookmark[]>([]);

  /**
   * Cookie key used to store bookmarks under.
   * @private {String}
   */
  private readonly cookieName = 'bookmarks';

  /**
   * Contructor used to create new BookmarksService object.
   * @private {LocalStorageService} localStorageService_ Used to handle storage events.
   */
  constructor(private localStorageService_: LocalStorageService) {  }

  /**
   * Returns bookmarks list observable.
   * @return {Observable<Bookmark[]>}
   */
  getBookmarks(): Observable<Bookmark[]> {
    // Get bookmarks
    this.bookmarks_ = this.localStorageService_.getItem(this.cookieName);

    // Emit bookmarks has changed observable
    this.bookmarksSubject_.next(this.bookmarks_);

    // Return bookmarks subject as an observable
    return this.bookmarksSubject_.asObservable();
  }

  /**
   * Returns bookmark of corresponding ID, and 'undefined' otherwise.
   * @param {string} id ID of bookmark to find and return.
   * @return {Bookmark}
   */
  find(id: string) {
    // Get bookmarks
    this.bookmarks_ = this.localStorageService_.getItem(this.cookieName);

    // Find and return bookmark, or 'undefined' otherwise
    return this.bookmarks_.find((bookmark) => bookmark.id === id);
  }

  /**
   * Method used to add and save a new bookmark.
   * @param {Bookmark | bookmark[]} bookmark Bookmark object to add, supports
   *     individual bookmarks or bookmark arrays.
   */
  add(bookmarks: Bookmark | Bookmark[]): void {
    // Get bookmarks
    this.bookmarks_ = this.localStorageService_.getItem(this.cookieName);

    // If input is an array, concat array to existing bookmarks
    if (Array.isArray(bookmarks)) {
      this.bookmarks_ = this.bookmarks_.concat(bookmarks);

    // Else push indivudal bookmark to start of array
    } else {
      this.bookmarks_.push(bookmarks);
    }
    // Save changes
    this.save_();
  }

  /**
   * If a bookmark currently exists with a given id, bookmark is updated,
   *     and 'true' is returned, or 'null' otherwise if no item was found.
   * @param {string}   id             ID of bookmark to find and update.
   * @param {Bookmark} bookmark       Bookmark to override existing bookmark with.
   * @param {boolean=} preventRefresh DEFAULTS to 'false', if set to true,
   *     bookmarks behaviour subject won't be triggered.
   * @return {string}
   */
  update(id: string, bookmark: Bookmark, preventRefresh = false): boolean {
    // Get bookmarks
    this.bookmarks_ = this.localStorageService_.getItem(this.cookieName);

    // Get index of bookmarks to update
    const index = this.bookmarks_.findIndex((bookmark) => bookmark.id === id);

    // If index exists, update bookmark
    if (index) {
      this.bookmarks_[index] = bookmark;

      // Save changes
      this.save_(preventRefresh);

      // Return true for success
      return true;
    } else {
      // Else, return error
      return null;
    }
  }

  /**
   * Method used to delete a bookmark from localStorage.
   * @param {string} id ID of bookmark to find and remove.
   */
  delete(id: string): void {
    // Get bookmarks
    this.bookmarks_ = this.localStorageService_.getItem(this.cookieName);

    // Filter out bookmark with given id
    this.bookmarks_ = this.bookmarks_.filter((bookmark) => bookmark.id !== id);

    // Save changes
    this.save_();
  }

  /**
   * Method used to delete all bookmarks from localStorage.
   */
  deleteAll(): void {
    // Delete key from localStorage to delete all
    this.localStorageService_.remove(this.cookieName);

    // Emit resetted bookmarks array
    this.bookmarksSubject_.next(this.bookmarks_ = []);
  }

  /**
   * Method used to save current bookmark array to localStorage.
   * @param {boolean=} preventRefresh DEFAULTS to 'false', if set to true,
   *     bookmarks behaviour subject won't be triggered.
   */
  private save_(preventRefresh = false): void {
    // Save current bookmarks array to storage
    this.localStorageService_.save(this.cookieName, this.bookmarks_);

    // If not prevent refresh, emit  bookmarks has changed observable
    if (!preventRefresh) {
      this.bookmarksSubject_.next(this.bookmarks_);
    }
  }

}
