import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardComponent } from './components/card/card.component';
import { StartViewComponent } from './views/start-view/start-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './components/board/board.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerComponent } from './components/player/player.component';
import { GameOverDialogComponent } from './dialogs/game-over-dialog/game-over-dialog.component';
import { MaterialModule } from './material-module';
import { WinnerSvgComponent } from './components/winner-svg/winner-svg.component';
import { CreateLocalGameViewComponent } from './views/create-local-game-view/create-local-game-view.component';
import { CreateServerGameViewComponent } from './views/create-server-game-view/create-server-game-view.component';
import { JoinServerGameViewComponent } from './views/join-server-game-view/join-server-game-view.component';
import { BoardFooterComponent } from './components/board-footer/board-footer.component';

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
    JoinServerGameViewComponent,
    BoardFooterComponent
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
  entryComponents: [GameOverDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
