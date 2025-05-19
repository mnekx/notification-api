import { Notification } from "./base";
import { SendStrategy } from "../strategies/send-strategy";

export class TwilioSmsNotification extends Notification {
    constructor(private phone: string, private message: string, sender: SendStrategy) {
        super(sender);
    }

    send(): void {
        const data = {
            phone: this.phone,
            message: this.message
        };
        this.sender.send(data);
    }
}