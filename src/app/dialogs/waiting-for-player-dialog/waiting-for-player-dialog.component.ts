import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Player } from '../../services/interfaces';

@Component({
  selector: 'app-waiting-for-player-dialog',
  templateUrl: './waiting-for-player-dialog.component.html',
  styleUrls: ['./waiting-for-player-dialog.component.css']
})
export class WaitingForPlayerDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WaitingForPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player[]
  ) {}

  ngOnInit() {}
}
