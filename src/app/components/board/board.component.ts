import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../services/interfaces';
import { MemoryGameService } from '../../services/memory-game-service/memory-game.service';
import { MemoryBoardService } from '../../services/memory-board-service/memory-board.service';
import { Board } from '../../services/interfaces';
import { GameOverDialogComponent } from '../../dialogs/game-over-dialog/game-over-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private board: Board;

  constructor(
    private memoryGameService: MemoryGameService,
    private memoryBoardService: MemoryBoardService,
    private router: Router,
    public dialog: MatDialog
  ) { }

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
    });
  }

  ngOnInit() {
    if (history.state.data) {
      if (history.state.data.network) {
        console.log('NETWORK')
        switch (history.state.data.network) {
          case 'join':
            this.memoryGameService.joinNetwork(
              history.state.data.session,
              history.state.data.playerTwo
            );
            break;
          case 'create':
            this.memoryGameService.initNetwork(
              history.state.data.cardPairs,
              200,
              history.state.data.playerOne,
              history.state.data.sessionName,
              'http://localhost:4444'
            );
            break;
          default:
            console.error(`unknown notwork state '${history.state.data.network}'`);
            break;
        }
      } else {
        console.log('NO NETWORK')
        this.memoryGameService.initLocal(history.state.data.cardPairs, 200, [
          history.state.data.playerOne,
          history.state.data.playerTwo
        ]);
      }
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
