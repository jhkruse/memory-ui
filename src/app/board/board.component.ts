import { Component, OnInit } from '@angular/core';
import { MemoryGameLocalService } from '../services/memory-game-local.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(private memoryGameService: MemoryGameLocalService) {
  }

  ngOnInit() {
    console.log('INITIAL_DATA: ', history.state.data);
    this.memoryGameService.initCards(5, 200)
    // .then(() => console.log('INIT CARDS FINISHED'));
    console.log('AFTER INIT CARDS');
  }
}
