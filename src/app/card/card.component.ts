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

  constructor(
    private memoryGameLocalService: MemoryGameLocalService
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
    this.memoryGameLocalService.updateGame(card, index);
  }
}
