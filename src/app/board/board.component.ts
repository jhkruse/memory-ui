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

  openDialog(data: boolean | Player[]): void {
    const dialogRef = this.dialog.open(GameOverDialogComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      switch (result) {
        case 'reset':
          this.memoryGameService.reset();
          break;
        case 'quit':
          this.memoryGameService.quit();
          break;
        default:
          this.memoryGameService.reset();
          break;
      }
      console.log(result);
    });
  }

  ngOnInit() {
    if (history.state.data) {
      this.memoryGameService.initCards(history.state.data.cardPairs, 200);
      this.memoryGameService.addPlayer(history.state.data.playerOne);
      this.memoryGameService.addPlayer(history.state.data.playerTwo);
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
        if (data) {
          this.openDialog(data);
        }
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
