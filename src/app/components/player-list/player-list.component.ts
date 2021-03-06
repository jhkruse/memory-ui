import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from '../../services/interfaces';
import { MemoryGameService } from '../../services/memory-game-service/memory-game.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnDestroy {
  public players: Player[];
  private playersSubscription: Subscription;

  constructor(private memoryPlayerService: MemoryGameService) {
    this.players = [];
  }

  ngOnInit() {
    this.playersSubscription = this.memoryPlayerService.getPlayers().subscribe(
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
