import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Card, Cards } from './interfaces';
import { MemoryCard } from './memory-card';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class MemoryCardService implements Cards {
  private cards: Card[];
  private cardsSubject: Subject<Card[]>;

  constructor(private imageService: ImageService) {
    this.cards = [];
    this.cardsSubject = new Subject<Card[]>();
  }

  /**
   * Randomly shuffle an array. See also: https://stackoverflow.com/a/2450976/1293256
   * @param array<T> - The array to shuffle.
   */
  private shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue: T;
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

  private amountOfUncoveredCards(): number {
    return this.cards.filter(card => card.uncovered).length;
  }

  public initCards(amount: number, imageSize: number): void {
    this.imageService.getRandomImages(amount, imageSize).subscribe(
      (data: string[]) => {
        let imageUrls = data.concat(data);
        imageUrls = this.shuffle<string>(imageUrls);
        this.cards = imageUrls.map(imageUrl => new MemoryCard(imageUrl));
        this.cardsSubject.next(this.cards);
      },
      err => console.log('ERROR getting cards: ', err)
    );
  }

  public shuffleCards(): void {
    this.cards = this.shuffle<Card>(this.cards);
    this.cardsSubject.next(this.cards);
  }

  public removeCards(pairId: string): void {
    this.cards.forEach(card => {
      if (card.pairId === pairId) {
        card.remove();
      }
    });
    this.cardsSubject.next(this.cards);
  }

  public isPair(pairId: string): boolean {
    const pairCards = this.cards.filter(
      card => card.pairId === pairId && card.uncovered
    ).length;
    return pairCards > 1;
  }

  public uncoverCard(index: number): number {
    this.cards[index].uncover();
    this.cardsSubject.next(this.cards);
    return this.amountOfUncoveredCards();
  }

  public coverCards(): void {
    this.cards.forEach(card => card.cover());
    this.cardsSubject.next(this.cards);
  }

  public getCards(): Observable<Card[]> {
    return this.cardsSubject;
  }

  public getCardsSnapshot(): Array<Card> {
    return this.cards.slice();
  }
}
