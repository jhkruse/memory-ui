export interface PlayerModel {
  networkId: string;
  name: string;
  score: number;
  active: boolean;
}

export interface CardModel {
  pairId: string;
  url: string;
  uncovered: boolean;
  removed: boolean;
}

export interface SessionMessage {
  id: string;
  name: string;
  status: string;
  sessionOwnerNetworkId: string;
  senderPlayerIndex: number;
  senderPlayerNetworkId: string;
  players: PlayerModel[];
  cards: CardModel[];
}

export interface SessionJoinMessage {
  id: string;
  senderPlayerIndex: number;
  senderPlayerNetworkId: string;
  players: PlayerModel[];
}

export interface SessionLeaveMessage {
  id: string;
  playerLeft: PlayerModel;
  senderPlayerIndex: number;
  senderPlayerNetworkId: string;
  players: PlayerModel[];
}

export interface SessionDeleteMessage {
  id: string;
  senderPlayerNetworkId: string;
}

export interface CardsUpdateMessage {
  sessionId: string;
  senderPlayerIndex: number;
  senderPlayerNetworkId: string;
  cards: CardModel[];
}

export interface PlayersUpdateMessage {
  sessionId: string;
  senderPlayerIndex: number;
  senderPlayerNetworkId: string;
  players: PlayerModel[];
}

/**
 * The socket client options.
 */
export interface ClientOptions {
  /**  The current index of the player in the player array. */
  playerIndex: number;
  /** The network ID of the player. */
  playerNetworkId: string;
  /** The URL of the socket server. */
  socketUrl: string;
}
