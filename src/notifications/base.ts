import { SendStrategy } from "../strategies/send-strategy";

export abstract class Notification {
protected sender: SendStrategy;

  constructor(sender: SendStrategy) {
    this.sender = sender;
  }

  abstract send(): void;
}