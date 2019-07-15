import { Component, OnInit } from '@angular/core';
import { MemoryGameService } from '../../services/memory-game-service/memory-game.service';

@Component({
  selector: 'app-board-footer',
  templateUrl: './board-footer.component.html',
  styleUrls: ['./board-footer.component.css']
})
export class BoardFooterComponent implements OnInit {
  constructor(private memoryGameService: MemoryGameService) {}

  ngOnInit() {}

  handleOnResetClick() {
    this.memoryGameService.reset();
  }

  handleOnQuitClick() {
    this.memoryGameService.quit();
  }
}
