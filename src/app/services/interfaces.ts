import { Observable } from 'rxjs';
import { SessionModel } from '../../client/interfaces';

/**
 * The Picsum image model.
 */
export interface PicsumImage {
  id: number;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface Player {
  name: string;
  score: number;
  active: boolean;
  setActive(): void;
  setInactive(): void;
  incrementScore(): void;
  resetScore(): void;
}

export interface Card {
  pairId: string;
  url: string;
  uncovered: boolean;
  removed: boolean;
  cover(): void;
  uncover(): void;
  remove(): void;
}

export interface Board {
  isLocked: boolean;
  toggleIsLocked(): void;
}

export interface Players {
  resetPlayers(): void;
  removePlayer(id: number): void;
  addPlayer(name: string): number;
  nextPlayer(): number;
  incrementScore(playerId: number): number;
  resetScore(): void;
  getCurrentPlayerId(): number;
  getPlayers(): Observable<Player[]>;
  getWinner(): Player[];
}

export interface Cards {
  createCards(cards: Card[]): void;
  initCards(amount: number, imageSize: number): void;
  shuffleCards(): void;
  uncoverCard(index: number): number;
  coverCards(): void;
  removeCards(pairId: string): void;
  isPair(pairId: string): boolean;
  getCards(): Observable<Card[]>;
  getCardsSnapshot(): Card[];
}

export interface Game extends Players, Cards {
  initLocal(cardPairs: number, imageSize: number, playerNames: string[]): void;
  initNetwork(cardPairs: number, imageSize: number, playerName: string, sessionName: string, socketUrl: string): void;
  getNetworkSessions(): Observable<SessionModel[]>;
  updateGame(card: Card, index: number): void;
  isGameOver(): void;
  getGameOver(): Observable<boolean | Player[]>;
  reset(): void;
  quit(): void;
}
