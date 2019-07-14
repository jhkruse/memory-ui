import { Subscription, Observable, Subject } from 'rxjs';
import { AbstractPlayerClient } from '../../../client/abstract-player-client';
import {
  ClientOptions,
  SessionModel,
  SessionJoinModel,
  SessionLeaveModel,
  CardsUpdateModel,
  PlayersUpdateModel,
} from '../../../client/interfaces';
import { Game, Player } from '../interfaces';

export class PlayerSocketClient extends AbstractPlayerClient {
  private memoryGameService: Game;
  private playersSubscription: Subscription;
  private players: Player[];
  private sessions: SessionModel[];
  private sessionsSubject: Subject<SessionModel[]>;

  constructor(memoryGameService: Game, options: ClientOptions) {
    super(options);
    this.memoryGameService = memoryGameService;
    // this.subscribeToPlayers();
    this.players = [];
    this.sessionsSubject = new Subject<SessionModel[]>();
  }

  protected onPlayerStartedGame(session: SessionModel, connected: boolean): void {
    console.log(`onPlayerStartedGame for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(session, null, 2)}`)
  }
  protected onPlayerJoinedGame(session: SessionJoinModel, connected: boolean): void {
    console.log(`onPlayerJoinedGame for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(session, null, 2)}`)
    // if () {

    // }
  }
  protected onPlayerLeftGame(session: SessionLeaveModel, connected: boolean): void {
    console.log(`onPlayerLeftGame for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(session, null, 2)}`)
  }
  protected onCardsUpdate(update: CardsUpdateModel): void {
    console.log(`onCardsUpdate for player ${this.playerIndex + 1} => ${JSON.stringify(update, null, 2)}`)
  }
  protected onPlayersUpdate(update: PlayersUpdateModel): void {
    console.log(`onPlayersUpdate for player ${this.playerIndex + 1} => ${JSON.stringify(update, null, 2)}`)
  }
  protected onGameSessionsUpdate(sessions: SessionModel[], connected: boolean): void {
    console.log(`onGameSessionsUpdate for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(sessions, null, 2)}`)
    this.sessions = sessions;
    this.sessionsSubject.next(this.sessions);
  }

  public getSessions(): Observable<SessionModel[]> {
    return this.sessionsSubject;
  }
}
