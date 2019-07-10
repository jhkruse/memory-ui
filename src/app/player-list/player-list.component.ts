import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../services/interfaces';
import { MemoryGameLocalService } from '../services/memory-game-local.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  private players: Player[];

  private playersSubscription: Subscription;

  constructor(private memoryPlayerService: MemoryGameLocalService) {
    this.players = [];
  }

  ngOnInit() {
    this.playersSubscription = this.memoryPlayerService
      .getPlayers()
      .subscribe(
        (data: Player[]) => {
          this.players = data;
        },
        err => console.log('ERROR getting players: ', err)
      );
  }

  ngOnDestroy() {
    if (this.playersSubscription) {
      this.playersSubscription.unsubscribe();
    }
  }
}
