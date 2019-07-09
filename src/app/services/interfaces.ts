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
  uncover(): void;
  hide(): void;
  remove(): void;
}

export interface Players {
  resetPlayers(): void;
  removePlayer(id: number): void;
  addPlayer(name: string): number;
  nextPlayer(): number;
  incrementScore(id: number): number;
  getCurrentPlayerId(): number;
  getPlayers(): Observable<Player[]>;
}

export interface Cards {
  initCards(amount: number, imageSize: number): void;
  shuffleCards(): void;
  hideCards(): void;
  removeCards(pairId: string): void;
  getCards(): Observable<Card[]>;
}

export interface Game extends Players, Cards {
  init(): void;
  reset(): void;
  quit(): void;
}
