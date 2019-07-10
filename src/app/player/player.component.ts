import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../services/interfaces';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  @Input() playerNo: number;

  constructor() { }

  ngOnInit() {
  }

}
