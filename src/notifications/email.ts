import { Notification } from "./base";
import { SendStrategy } from "../strategies/send-strategy";

export class ConsoleEmailNotification extends Notification {
    constructor(private recipient: string, private subject: string, private body: string, sender: SendStrategy) {
        super(sender);
    }

    send(): void {
        const data = {
            recipient: this.recipient,
            subject: this.subject,
            body: this.body
        };
        this.sender.send(data);
    }
}