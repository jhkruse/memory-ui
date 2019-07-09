import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  throwError,
} from 'rxjs';
import {
  catchError,
  retry,
  map,
} from 'rxjs/operators';
import { PicsumImage } from './interfaces';

/**
 * The Picsum API base URL.
 */
const BASE_URL = 'https://picsum.photos';

/**
 * The Picsum API image list URL.
 */
const LIST_URL = `${BASE_URL}/v2/list`;

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

  // /**
  //  * Maps the given `PicsumImage` objects to image URLs.
  //  * @param images    - The image objects to map-
  //  * @param imageSize - The image pixel size to apply.
  //  */
  // private picsumImagesToUrls(images: PicsumImage[], imageSize: number): string[] {
  //   return images.map(image => `${BASE_URL}/id/${image.id}/${imageSize}`);
  //   // imageUrls = imageUrls.concat(imageUrls);
  //   // return this.shuffle(imageUrls);
  // }

  // extractData(res: HttpResponse<object>) {
  //   var array = new Array();
  //   var key, count = 0;
  //   for (key in res.body) {
  //     array.push(res.body[count++]);
  //   }
  //   return array;
  // }

  /**
   * Provides a list with the amount of image URLs with the given square size.
   * @param imageAmount - The amount of image object Memory pairs.
   * @param imageSize   - The image pixel size to apply.
   */
  public getRandomImages(imageAmount: number = 5, imageSize: number = 20): Observable<string[]> {
    return this.http
      .get<PicsumImage[]>(LIST_URL, {
        // observe: 'response',
        params: new HttpParams().set('limit', `${imageAmount}`),
      })
      //     .toPromise()
      //     .then((res: HttpResponse<PicsumImage[]>) => res.body.map(picsumImage => `${BASE_URL}/id/${picsumImage.id}/${imageSize}`))
      //     .catch(err => Promise.reject(err.error || 'Image server error'));
      // }




      .pipe(
        retry(2), // retry a failed request up to 2 times
        map((images: PicsumImage[]) => images.map(image => `${BASE_URL}/id/${image.id}/${imageSize}`)),
        catchError(this.handleError)
      );
  }
}
