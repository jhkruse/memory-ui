import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Maximum amount of pairs: 14 pairs => 4 to 28 cards.
 */
const MAX_AMOUNT_PAIRS = 14;

@Component({
  selector: 'app-join-server-game-view',
  templateUrl: './join-server-game-view.component.html',
  styleUrls: ['./join-server-game-view.component.css']
})
export class JoinServerGameViewComponent implements OnInit {
  playerOneFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorStateMatcher();
  serverList: string[];

  constructor(private router: Router) {
    this.serverList = ['Server 1', 'Server2'];
  }

  ngOnInit() {}

  onSubmit(f: NgForm) {
    this.router.navigate(['/board'], {
      state: {
        data: {
          playerOne: this.playerOneFormControl.value
        }
      }
    });
  }
}
