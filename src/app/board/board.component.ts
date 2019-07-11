import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryGameLocalService } from '../services/memory-game-local.service';
import { MemoryBoardService } from '../services/memory-board.service';
import { Board } from '../services/interfaces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private board: Board;

  constructor(
    private memoryGameService: MemoryGameLocalService,
    private memoryBoardService: MemoryBoardService,
    private router: Router
  ) { }

  ngOnInit() {
    if (history.state.data) {
      this.memoryGameService.initCards(history.state.data.cardPairs, 200);
      this.memoryGameService.addPlayer(history.state.data.playerOne);
      this.memoryGameService.addPlayer(history.state.data.playerTwo);
    } else {
      // Go back to initial (players) view.
      this.router.navigateByUrl('');
    }

    this.memoryBoardService
      .getBoard()
      .subscribe(
        (data: Board) => {
          this.board = data;
        },
        err => console.log('ERROR getting board: ', err)
      );
  }

  createCSSClass(): string {
    let CSSclass = 'board';

    if (this.board && this.board.isLocked) {
      CSSclass += ` locked`;
    }

    return CSSclass;
  }
}
