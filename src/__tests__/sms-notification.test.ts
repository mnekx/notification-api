import { TwilioSmsNotification } from "../notifications/sms";
import { SendStrategy } from "../strategies/send-strategy";
class MockSmsSender implements SendStrategy {
    public sentData: any = null;

    send(data: any): void {
        this.sentData = data;
    }
}   

describe("TwilioSmsNotification", () => {
    it("should send SMS with correct data", () => {
        const mockSmsSender = new MockSmsSender();
        const smsNotification = new TwilioSmsNotification(
            "+1234567890",
            "Test Message",
            mockSmsSender
        );
        smsNotification.send();

        expect(mockSmsSender.sentData).toEqual({
            phone: "+1234567890",
            message: "Test Message",
        });
    });
});