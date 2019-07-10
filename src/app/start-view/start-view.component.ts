import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['./start-view.component.css']
})

export class StartViewComponent implements OnInit {
  playerOneFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  playerTwoFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  cardAmountFormControl = new FormControl(8, [
    Validators.required,
  ]);

  matcher = new FormErrorStateMatcher();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    console.log(this.playerOneFormControl.value);
    this.router.navigate(['/board'], {
      state: {
        data: {
          playerOne: this.playerOneFormControl.value,
          playerTwo: this.playerTwoFormControl.value,
          cardAmount: this.cardAmountFormControl.value,
        }
      }
    });
  }

}
