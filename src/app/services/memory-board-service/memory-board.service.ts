import { Injectable } from '@angular/core';
import { Board } from '../interfaces';
import { MemoryBoard } from './memory-board';
import { MemoryGameLocalService } from '../memory-game-service/memory-game.service';
import { Card } from '../interfaces';
import {
  Observable,
  Subject,
} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class MemoryBoardService {
  private boardSubject: Subject<Board>;
  private board: Board;

  constructor() {
    this.boardSubject = new Subject<Board>();
    this.board = new MemoryBoard();
  }

  public toggleIsLockedBoard(): void {
    this.board.toggleIsLocked();
    this.boardSubject.next(this.board);
  }

  public getBoard(): Observable<Board> {
    return this.boardSubject;
  }
}
