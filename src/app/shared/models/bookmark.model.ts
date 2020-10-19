import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Model class used to define a new bookmark object.
 */
export class Bookmark {

    /**
     * Unique identifer.
     * @type {string}
     */
    id: string;

    /**
     * Custom url name.
     * @type {string}
     */
    name: string;

    /**
     * Bookmark url.
     * @type {string}
     */
    url: string;

    /**
     * If bookmark is currently favourited (true), or not (false).
     * @type {boolean}
     */
    favourited: boolean;

    /**
     * Text regex used to prevent empty whitespaces strings.
     * @param {RegExp}
     */
    private hasTextRegex = new RegExp(/.*\S.*/);

    /**
     * Contructor used to create new Bookmark object.
     * @param {string=}  name       A custom url name.
     * @param {string=}  url        A destination url of bookmark.
     * @param {boolean=} favourited parameter to define if
     *     bookmark has been favourited or not.
     */
    constructor(name?: string, url?: string, favourited?: boolean) {
      // Generate unique ID based on current time
      this.id = new Date().getTime().toString();
      this.name = name;
      this.url = url;
      this.favourited = favourited;
    }

    /**
     * Method used to create a new empty formGroup object wih validation.
     * @param {FormBuilder} formBuilder FormBuilder object used to generate form.
     * @return {number} FormGroup object.
     */
    getForm(formBuilder: FormBuilder) {
      return formBuilder.group({
        name: [this.name, [Validators.required, Validators.maxLength(255), Validators.pattern(this.hasTextRegex)]],
        url: [this.url, [Validators.required, Validators.pattern(this.hasTextRegex)]],
        favourited: [this.favourited],
      });
    }

    /**
     * Method used to set this object based on given formGroup object.
     * @param {FormGroup} formGroup FormGroup object to get values from.
     */
    from(formGroup: FormGroup) {
      const form = formGroup.value;
      this.name = form.name;
      this.url = form.url;
      this.favourited = form.favourited;
    }
}
