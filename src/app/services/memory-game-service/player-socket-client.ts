import { Subscription, Observable, Subject } from 'rxjs';
import { AbstractPlayerClient } from '../../../client/abstract-player-client';
import {
  ClientOptions,
  SessionMessage,
  SessionJoinMessage,
  SessionLeaveMessage,
  CardsUpdateMessage,
  PlayersUpdateMessage,
  CardModel,
  PlayerModel,
} from '../../../client/interfaces';
import { Game, Player, Card } from '../interfaces';
import { MemoryCard } from '../memory-card-service/memory-card';
import { MemoryPlayer } from '../player-service/memory-player';

export class PlayerSocketClient extends AbstractPlayerClient {
  private memoryGameService: Game;
  private playersSubscription: Subscription;
  private players: Player[];
  private sessions: SessionMessage[];
  private sessionsSubject: Subject<SessionMessage[]>;

  constructor(memoryGameService: Game, options: ClientOptions) {
    super(options);
    this.memoryGameService = memoryGameService;
    // this.subscribeToPlayers();
    this.players = [];
    this.sessionsSubject = new Subject<SessionMessage[]>();
  }

  /**
   *
   * @param session
   * @param connected
   * @callback
   */
  protected onPlayerStartedGame(session: SessionMessage, connected: boolean): void {
    console.log(`onPlayerStartedGame for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(session, null, 2)}`)
  }
  protected onPlayerJoinedGame(session: SessionJoinMessage, connected: boolean): void {
    console.log(`onPlayerJoinedGame for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(session, null, 2)}`)
    if (session.senderPlayerNetworkId !== this.getPlayerNetworkId()) {
      this.memoryGameService.addPlayer(session.players[session.senderPlayerIndex].name);
    }
  }
  protected onPlayerLeftGame(session: SessionLeaveMessage, connected: boolean): void {
    console.log(`onPlayerLeftGame for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(session, null, 2)}`)
  }
  protected onCardsUpdate(update: CardsUpdateMessage): void {
    console.log(`onCardsUpdate for player ${this.playerIndex + 1} => ${JSON.stringify(update, null, 2)}`)
    if (update.senderPlayerNetworkId !== this.getPlayerNetworkId()) {
      const cardsModel: CardModel[] = update.cards.slice();
      const cards: Card[] = cardsModel.map((cardModel) => {
        const card = new MemoryCard(cardModel.url);
        card.uncovered = cardModel.uncovered;
        card.removed = cardModel.removed;
        return card;
      });
      console.log(`CARDS from session: ${JSON.stringify(cards)}`)
      this.memoryGameService.createCards(cards);
    }
  }
  protected onPlayersUpdate(update: PlayersUpdateMessage): void {
    console.log(`onPlayersUpdate for player ${this.playerIndex + 1} => ${JSON.stringify(update, null, 2)}`)
    if (update.senderPlayerNetworkId !== this.getPlayerNetworkId()) {
      const playersModel: PlayerModel[] = update.players.slice();
      const players: Player[] = playersModel.map((playerModel) => {
        const player = new MemoryPlayer(playerModel.name, playerModel.active);
        player.score = playerModel.score;
        return player;
      });
      console.log(`PLAYERS from update: ${JSON.stringify(players)}`)
      this.memoryGameService.createPlayers(players);
    }
  }
  protected onGameSessionsUpdate(sessions: SessionMessage[], connected: boolean): void {
    // console.log(`onGameSessionsUpdate for player ${this.playerIndex + 1} (connected: ${connected}) => ${JSON.stringify(sessions, null, 2)}`)
    this.sessions = sessions;
    this.sessionsSubject.next(this.sessions);
  }

  public getSessions(): Observable<SessionMessage[]> {
    return this.sessionsSubject;
  }
}
