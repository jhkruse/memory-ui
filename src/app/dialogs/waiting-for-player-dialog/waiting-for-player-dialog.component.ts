import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-waiting-for-player-dialog',
  templateUrl: './waiting-for-player-dialog.component.html',
  styleUrls: ['./waiting-for-player-dialog.component.css']
})
export class WaitingForPlayerDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<WaitingForPlayerDialogComponent>) {}

  ngOnInit() {}
}
