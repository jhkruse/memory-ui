import { Observable } from 'rxjs';

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
  getCurrentPlayerId(): number;
  getPlayers(): Observable<Player[]>;
}

export interface Cards {
  initCards(amount: number, imageSize: number): void;
  shuffleCards(): void;
  uncoverCard(index: number): number;
  coverCards(): void;
  removeCards(pairId: string): void;
  isPair(pairId: string): boolean;
  getCards(): Observable<Card[]>;
}

export interface Game extends Players, Cards {
  init(): void;
  reset(): void;
  quit(): void;
}
