import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../services/interfaces';
import { MemoryGameLocalService } from '../services/memory-game-local.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() index: number;

  constructor(private memoryGameService: MemoryGameLocalService) { }

  ngOnInit() {
  }

  createCSSClass(card: Card): string {
    let CSSclass = 'card';

    if (card && card.uncovered) {
      CSSclass += ` uncovered`;
    }

    return CSSclass;
  }

  handleOnClick(index: number, card: Card) {
    console.log(123);
    const amountOfUncoveredCards = this.memoryGameService.uncoverCard(index);
    if ( amountOfUncoveredCards > 1 &&  this.memoryGameService.isPair(card.pairId)) {
      //setTimeout(() => this.memoryGameService.coverCards() , 3000);
    } else if (amountOfUncoveredCards > 1) {
      setTimeout(() => this.memoryGameService.coverCards() , 3000);
    }
  }
}
