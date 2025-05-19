import { SendStrategy } from "./send-strategy";

export class TwilioSMSSender implements SendStrategy {
  send(data: any): void {
    console.log(`SMS to ${data.phone}: Message: ${data.message}`);
  }
}