import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../services/interfaces';
import { MemoryGameLocalService } from '../services/memory-game-local.service';
import { MemoryBoardService } from '../services/memory-board.service';
import { Board } from '../services/interfaces';
import { GameOverDialogComponent } from '../game-over-dialog/game-over-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private board: Board;
  private gameOver: boolean | Player[];

  constructor(
    private memoryGameService: MemoryGameLocalService,
    private memoryBoardService: MemoryBoardService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(GameOverDialogComponent, {
      width: '250px',
      data: { name: 'Peter', animal: 'Pan' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    if (history.state.data) {
      this.memoryGameService.initCards(history.state.data.cardPairs, 200);
      this.memoryGameService.addPlayer(history.state.data.playerOne);
      this.memoryGameService.addPlayer(history.state.data.playerTwo);
      this.openDialog();
    } else {
      // Go back to initial (players) view.
      this.router.navigateByUrl('');
    }

    this.memoryBoardService.getBoard().subscribe(
      (data: Board) => {
        this.board = data;
      },
      err => console.log('ERROR getting board: ', err)
    );

    this.memoryGameService.getGameOver().subscribe(
      (data: boolean | Player[]) => {
        this.gameOver = data;
      },
      err => console.log('ERROR getting gameOver: ', err)
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
