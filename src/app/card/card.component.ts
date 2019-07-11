import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../services/interfaces';
import { MemoryGameLocalService } from '../services/memory-game-local.service';
import { MemoryBoardService } from '../services/memory-board.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Input() index: number;

  constructor(
    private memoryGameService: MemoryGameLocalService,
    private memoryBoardService: MemoryBoardService
  ) { }

  ngOnInit() {
  }

  createCSSClass(card: Card): string {
    let CSSclass = 'card';

    if (card && card.uncovered) {
      CSSclass += ` uncovered`;
    }

    if (card && card.removed) {
      CSSclass += ` removed`;
    }

    return CSSclass;
  }

  handleOnClick(index: number, card: Card) {
    this.memoryBoardService.toggleIsLocked();
    const amountOfUncoveredCards = this.memoryGameService.uncoverCard(index);

    if (amountOfUncoveredCards > 1) {
      if (this.memoryGameService.isPair(card.pairId)) {
        setTimeout(() => {
          this.memoryGameService.removeCards(card.pairId);
          this.memoryGameService.incrementScore(this.memoryGameService.getCurrentPlayerId());
          this.memoryBoardService.toggleIsLocked();
        }, 3000);
      } else {
        setTimeout(() => {
          this.memoryGameService.coverCards();
          this.memoryGameService.nextPlayer();
          this.memoryBoardService.toggleIsLocked();
        }, 3000);
      }
    } else {
      this.memoryBoardService.toggleIsLocked();
    }
  }
}
