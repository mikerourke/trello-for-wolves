export class TrelloForWolvesError extends Error {
  constructor(message: string) {
    super(`Trello for Wolves: ${message}`);
    this.name = "TrelloForWolvesError";
  }
}
