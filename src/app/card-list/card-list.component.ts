import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Card } from '../services/interfaces';
import { MemoryGameLocalService } from '../services/memory-game-local.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy {
  public cards: Card[];
  private cardsSubscription: Subscription;

  constructor(private memoryCardService: MemoryGameLocalService) {
    this.cards = [];
  }

  ngOnInit() {
    this.cardsSubscription = this.memoryCardService.getCards().subscribe(
      (data: Card[]) => {
        this.cards = data;
      },
      err => console.log('ERROR getting cards: ', err)
    );
  }

  ngOnDestroy() {
    if (this.cardsSubscription) {
      this.cardsSubscription.unsubscribe();
    }
  }
}
