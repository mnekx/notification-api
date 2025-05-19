import { SendStrategy } from "./send-strategy";

export class FirebasePushSender implements SendStrategy {
  send(data: any): void {
    console.log(`Push to ${data.token}: ${data.title} - ${data.message}`);
  }
}