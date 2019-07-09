import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryGameLocalService } from '../services/memory-game-local.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  constructor(private memoryGameService: MemoryGameLocalService, private router: Router) { }

  ngOnInit() {
    console.log('INITIAL_DATA: ', history.state.data); // TODO remove
    if (history.state.data) {
      this.memoryGameService.initCards(history.state.data.cardAmount, 200);
      this.memoryGameService.addPlayer(history.state.data.playerOne);
      this.memoryGameService.addPlayer(history.state.data.playerTwo);
    } else {
      // Go back to initial (players) view.
      this.router.navigateByUrl('');
    }
    console.log('AFTER INIT CARDS'); // TODO remove
  }
}
