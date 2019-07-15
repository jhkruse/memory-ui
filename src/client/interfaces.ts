/**
 * The player model to persist in session.
 */
export interface PlayerModel {
  /** The player's network ID. */
  networkId: string;
  /** The player's name. */
  name: string;
  /** The player's current score. */
  score: number;
  /** Whether the player is the active one. */
  active: boolean;
}

/**
 * The card model to persist in session.
 */
export interface CardModel {
  /** The card pair ID. */
  pairId: string;
  /** The image URL. */
  url: string;
  /** Whether the card is uncovered on board. */
  uncovered: boolean;
  /** Whether the card is removed from board. */
  removed: boolean;
}

/**
 * A message representing the whole session.
 */
export interface SessionMessage {
  /** The sesion ID. */
  id: string;
  /** The sesion name. */
  name: string;
  /** The sesion status: `open` or `joined`. */
  status: string;
  /** The ID of the player who created the session. */
  sessionOwnerNetworkId: string;
  /** The current index of the player in the player array who sends the message. */
  senderPlayerIndex: number;
  /** The network ID of the player who sends the message. */
  senderPlayerNetworkId: string;
  /** The joined players. */
  players: PlayerModel[];
  /** All game cards. */
  cards: CardModel[];
}

/**
 * A message in case a player intends to join a session.
 */
export interface SessionJoinMessage {
  /** The sesion ID. */
  id: string;
  /** The current index of the player in the player array who sends the message. */
  senderPlayerIndex: number;
  /** The network ID of the player who sends the message. */
  senderPlayerNetworkId: string;
  /** The joined players. */
  players: PlayerModel[];
}

/**
 * A message in case a player intends to leave a session.
 */
export interface SessionLeaveMessage {
  /** The sesion ID. */
  id: string;
  /** The player who wants to leave. */
  playerLeft: PlayerModel;
  /** The current index of the player in the player array who sends the message. */
  senderPlayerIndex: number;
  /** The network ID of the player who sends the message. */
  senderPlayerNetworkId: string;
  /** The joined players. */
  players: PlayerModel[];
}

/**
 * A message in case  a session is to delete.
 */
export interface SessionDeleteMessage {
  /** The sesion ID. */
  id: string;
  /** The network ID of the player who sends the message. */
  senderPlayerNetworkId: string;
}

export interface CardsUpdateMessage {
  /** The sesion ID. */
  sessionId: string;
  /** The current index of the player in the player array who sends the message. */
  senderPlayerIndex: number;
  /** The network ID of the player who sends the message. */
  senderPlayerNetworkId: string;
  /** All game cards. */
  cards: CardModel[];
}

export interface PlayersUpdateMessage {
  /** The sesion ID. */
  sessionId: string;
  /** The current index of the player in the player array who sends the message. */
  senderPlayerIndex: number;
  /** The network ID of the player who sends the message. */
  senderPlayerNetworkId: string;
  /** The joined players. */
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
