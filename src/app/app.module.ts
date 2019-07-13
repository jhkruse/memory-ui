import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { StartViewComponent } from './start-view/start-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerComponent } from './player/player.component';
import { GameOverDialogComponent } from './game-over-dialog/game-over-dialog.component';
import { MaterialModule } from './material-module';
import { WinnerSvgComponent } from './winner-svg/winner-svg.component';
import { CreateLocalGameViewComponent } from './create-local-game-view/create-local-game-view.component';
import { CreateServerGameViewComponent } from './create-server-game-view/create-server-game-view.component';
import { JoinServerGameViewComponent } from './join-server-game-view/join-server-game-view.component';

@NgModule({
   declarations: [
      AppComponent,
      CardListComponent,
      CardComponent,
      StartViewComponent,
      BoardComponent,
      PlayerListComponent,
      PlayerComponent,
      GameOverDialogComponent,
      WinnerSvgComponent,
      CreateLocalGameViewComponent,
      CreateServerGameViewComponent,
      JoinServerGameViewComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MaterialModule
   ],
   entryComponents: [
      GameOverDialogComponent
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
