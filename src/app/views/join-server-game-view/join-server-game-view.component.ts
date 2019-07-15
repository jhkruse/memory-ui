import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { MemoryGameService } from '../../services/memory-game-service/memory-game.service';
import { SessionMessage } from '../../../client/interfaces';
import { Subscription } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-join-server-game-view',
  templateUrl: './join-server-game-view.component.html',
  styleUrls: ['./join-server-game-view.component.css']
})
export class JoinServerGameViewComponent implements OnInit, OnDestroy {
  playerTwoFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorStateMatcher();
  sessions: SessionMessage[];
  sessionSubscription: Subscription;

  constructor(private router: Router, private memoryGameService: MemoryGameService) {
    this.sessions = [];
  }

  ngOnInit() {
    this.memoryGameService.scanNetwork('http://localhost:4444');
    this.sessionSubscription = this.memoryGameService.getNetworkSessions().subscribe(
      (data: SessionMessage[]) => {
        this.sessions = data;
      },
      err => console.log('ERROR getting cards: ', err)
    );
  }

  ngOnDestroy() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  onSubmit(session: SessionMessage) {
    this.router.navigate(['/board'], {
      state: {
        data: {
          network: 'join',
          playerTwo: this.playerTwoFormControl.value,
          session,
        }
      }
    });
  }
}
