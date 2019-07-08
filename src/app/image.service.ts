import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Observable,
  throwError,
} from 'rxjs';
import {
  catchError,
  retry,
  map,
} from 'rxjs/operators';

/**
 * The Picsum API base URL.
 */
const BASE_URL = 'https://picsum.photos';

/**
 * The Picsum API image list URL.
 */
const LIST_URL = `${BASE_URL}/v2/list`;

/**
 * The Picsum image model.
 */
interface PicsumImage {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

/**
 * The Memory image model has an ID and a URL.
 */
export interface MemoryImage {
  id: number;
  url: string;
}

/**
 * Service provider to fetch images and return them as a list of Memory pair objects.
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  /**
   * Constructor.
   * @param http - The injected HTTP client to fetch images.
   */
  constructor(private http: HttpClient) { }

  /**
   * Handles an HTTP request error.
   * @param error - The error to handle.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Randomly shuffle an array. See also: https://stackoverflow.com/a/2450976/1293256
   * @param array - The array to shuffle.
   */
  private shuffle(array: string[]): string[] {
    let currentIndex = array.length;
    let temporaryValue: string;
    let randomIndex: number;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /**
   * Maps the given `PicsumImage` objects to image URLs.
   * @param images    - The image objects to map-
   * @param imageSize - The image pixel size to apply.
   */
  private picsumImagesToUrls(images: PicsumImage[], imageSize: number): string[] {
    let imageUrls = images.map(image => `${BASE_URL}/id/${image.id}/${imageSize}`);
    imageUrls = imageUrls.concat(imageUrls);
    return this.shuffle(imageUrls);
  }

  /**
   * Maps the given URLs to `MemoryImage` objects.
   * @param urls - The URLs to map.
   */
  private imageUrlsToMemoryImages(urls: string[]): MemoryImage[] {
    return urls.map<MemoryImage>((url, id) => ({ id, url }));
  }

  /**
   * Provides a list with the amount of image object Memory pairs.
   * @param [imageSize=200]  - The image pixel size to apply.
   * @param [imageAmount=10] - The amount of image object Memory pairs.
   */
  public getShuffledMemoryImages(imageSize: number = 200, imageAmount: number = 10): Observable<MemoryImage[]> {
    return this.http
      .get<PicsumImage[]>(`${LIST_URL}?limit=${imageAmount}`)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        map((images: PicsumImage[]) => this.picsumImagesToUrls(images, imageSize)),
        map(this.imageUrlsToMemoryImages),
        catchError(this.handleError)
      );
  }
}
