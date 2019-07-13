import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-winner-svg',
  templateUrl: './winner.svg',
  styleUrls: ['./winner-svg.component.css']
})
export class WinnerSvgComponent implements OnInit {
  private fill = 'rgb(255,215,0)';

  constructor() {}

  ngOnInit() {}
}
