import { Notification } from "./base";
import { SendStrategy } from "../strategies/send-strategy";

export class FirebasePushNotification extends Notification {
    constructor(private deviceToken: string, private message: string, private title: string, sender: SendStrategy) {
        super(sender);
    }

    send(): void {
        const data = {
            token: this.deviceToken,
            message: this.message,
            title: this.title || "Default Title",
        };
        this.sender.send(data);
    }
}