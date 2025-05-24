import { FirebasePushNotification } from "../notifications/push";
import { SendStrategy } from "../strategies/send-strategy";
class MockPushSender implements SendStrategy {
	public sentData: any = null;

	send(data: any): void {
		this.sentData = data;
	}
}

describe("FirebasePushNotification", () => {
	it("should send push notification with correct data", () => {
		const mockPushSender = new MockPushSender();
		const pushNotification = new FirebasePushNotification(
			"device_token_123",
			"Test Message",
			"Test Title",
			mockPushSender
		);
		pushNotification.send();

		expect(mockPushSender.sentData).toEqual({
			token: "device_token_123",
			message: "Test Message",
			title: "Test Title",
		});
	});
});
