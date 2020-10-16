import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})
export class BookmarkFormComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() { }

  /**
   * Method used to cancel this form.
   */
  cancel() {
    console.log('Cancel!');
  }

}
