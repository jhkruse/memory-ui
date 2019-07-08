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

const BASE_URL = 'https://picsum.photos';
const LIST_URL = `${BASE_URL}/v2/list`;

interface PicsumImage {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface MemoryImage {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Randomly shuffle an array, see: https://stackoverflow.com/a/2450976/1293256
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

  getShuffledMemoryImages(imageSize: number = 200, imageAmount: number = 10): Observable<MemoryImage[]> {
    return this.http
      .get<PicsumImage[]>(`${LIST_URL}?limit=${imageAmount}`)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        map((images: PicsumImage[]) => {
          let imageUrls = images.map(image => `${BASE_URL}/id/${image.id}/${imageSize}`);
          imageUrls = imageUrls.concat(imageUrls);
          imageUrls = this.shuffle(imageUrls);
          return imageUrls.map((imageUrl, index) => ({
            id: index,
            url: imageUrl,
          }));
        }),
        catchError(this.handleError)
      );
  }
}
