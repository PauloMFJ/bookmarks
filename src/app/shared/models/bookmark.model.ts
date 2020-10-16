
/**
 * Model class used to define a unique bookmark object.
 */
export class Bookmark {

    pk: number;
    url: string;
    name: string;
    isFavourite: boolean;

    /**
     * Contructor used to create new bookmark object.
     * @param {number}  pk          A unique bookmark identifer.
     * @param {string}  url         A destination url of bookmark.
     * @param {string}  name        A custom url nickname.
     * @param {boolean} isFavourite Optional parameter to define if
     *     bookmark has been favourited or not.
     */
    constructor(pk: number, url: string, name: string, isFavourite?: boolean) {
      this.pk = pk;
      this.url = url;
      this.name = name;
      this.isFavourite = isFavourite;
    }
}
