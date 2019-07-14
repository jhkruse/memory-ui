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
  selector: 'app-create-server-game-view',
  templateUrl: './create-server-game-view.component.html',
  styleUrls: ['./create-server-game-view.component.css']
})
export class CreateServerGameViewComponent implements OnInit {
  /**
   * The options to choose for amount of cards on the board.
   */
  @Input() cardAmounts: number[];

  playerOneFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  serverNameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  cardAmountFormControl = new FormControl(16, [Validators.required]);

  matcher = new FormErrorStateMatcher();

  constructor(private router: Router) {
    this.cardAmounts = [];
    for (let index = 1; index <= MAX_AMOUNT_PAIRS; index++) {
      this.cardAmounts.push((index + 1) * 2);
    }
  }

  ngOnInit() { }

  onSubmit(f: NgForm) {
    this.router.navigate(['/board'], {
      state: {
        data: {
          network: true,
          playerOne: this.playerOneFormControl.value,
          sessionName: this.serverNameFormControl.value,
          cardPairs: this.cardAmountFormControl.value / 2
        }
      }
    });
  }
}
