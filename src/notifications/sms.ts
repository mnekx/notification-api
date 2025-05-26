import { Notification } from "./base";
import { SendStrategy } from "../strategies/send-strategy";
import prisma from "../prisma";

export class TwilioSmsNotification extends Notification {
    constructor(private phone: string, private message: string, sender: SendStrategy) {
        super(sender);
    }

   async send(): Promise<void> {
        const data = {
            phone: this.phone,
            message: this.message
        };
        
        try {
            // Simulate sending an SMS by logging to console
            console.log(`Sending SMS to ${this.phone}: ${this.message}`);

            this.sender.send(data);

            // Log the SMS notification to the database
            await prisma.notification.create({
                data: {
                    type: "SMS",
                    recipient: this.phone,
                    subject: "SMS Notification",
                    message: this.message,
                    status: "SENT",
                },
            });
            
        } catch (error) {
            console.error("Error sending SMS:", error);
            // Log the error to the database
            await prisma.notification.create({
                data: {
                    type: "SMS",
                    recipient: this.phone,
                    subject: "SMS Notification",
                    message: this.message,
                    status: "FAILED",
                    error: error instanceof Error ? error.message : String(error),
                },
            });
            throw error; // Re-throw the error after logging
            
        }
    }
}