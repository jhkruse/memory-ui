import { Injectable } from '@angular/core';
import {
  Observable,
  Subscription,
  of,
} from 'rxjs';
import {
  Card,
  Cards,
} from './interfaces';
import { MemoryCard } from './memory-card';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService implements Cards {
  private cards: Card[];

  // private imagesSubscription: Subscription;

  constructor(private imageService: ImageService) {
    this.cards = [];
  }

  /**
   * Randomly shuffle an array. See also: https://stackoverflow.com/a/2450976/1293256
   * @param array<V> - The array to shuffle.
   */
  private shuffle<V>(array: V[]): V[] {
    let currentIndex = array.length;
    let temporaryValue: V;
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

  public initCards(amount: number, imageSize: number): void {
    // let imageUrls = await this.imageService.getRandomImages(amount, imageSize);
    // // console.log('IMAGE_URLS: ', imageUrls); // TODO remove
    // imageUrls = imageUrls.concat(imageUrls);
    // imageUrls = this.shuffle<string>(imageUrls);
    // this.cards = imageUrls.map((imageUrl) => new MemoryCard(imageUrl));
    // console.log('CARDS in initCards: ', JSON.stringify(this.cards)) // TODO remove

    this.imageService.getRandomImages(amount, imageSize)
      .subscribe(
        (data: string[]) => {
          console.log('URLS: ', data); // TODO remove
          let imageUrls = data.concat(data);
          imageUrls = this.shuffle<string>(imageUrls);
          this.cards = imageUrls.map((imageUrl) => new MemoryCard(imageUrl));
          console.log('CARDS 3: ', this.cards); // TODO remove
        },
        err => console.log('ERROR getting cards: ', err)
      );
  }

  public shuffleCards(): void {
    this.cards = this.shuffle<Card>(this.cards);
  }

  public hideCards(): void {
    this.cards.forEach((card) => card.hide());
  }

  public removeCards(pairId: string): void {
    this.cards.forEach((card) => {
      if (card.pairId === pairId) {
        card.remove();
      }
    });
  }

  public getCards(): Observable<Card[]> {
    console.log('CARDS in getCards: ', JSON.stringify(this.cards)) // TODO remove
    return of(this.cards);
  }
}
