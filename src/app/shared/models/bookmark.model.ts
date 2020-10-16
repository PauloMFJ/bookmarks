
/**
 * Model class used to define an individual bookmark object.
 */
export class Bookmark {

    pk: number;
    url: string;
    name: string;
    isFavourite: boolean;

    /**
     * @param pk - A unique bookmark identifier.
     * @param url - A destination url of bookmark.
     * @param name - A custom url nickname.
     * @param isFavourite - Optional parameter to define if
     *     bookmark has been favourited or not.
     */
    constructor(pk: number, url: string, name: string, isFavourite?: boolean) {
      this.pk = pk;
      this.url = url;
      this.name = name;
      this.isFavourite = isFavourite;
    }
}
