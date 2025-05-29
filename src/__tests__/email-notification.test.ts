import { ConsoleEmailNotification } from "../notifications/email";
import { SendStrategy } from "../strategies/send-strategy";
import prisma from "../prisma";

class MockEmailSender implements SendStrategy {
	public sentData: any = null;

	send(data: any): void {
		this.sentData = data;
	}
}

describe("ConsoleEmailNotification", () => {

	it("should send email with correct data", () => {
		const MockEmailSenderInstance = new MockEmailSender();
		const emailNotification = new ConsoleEmailNotification(
			"test@gmail.com",
			"Test Subject",
			"hello",
			MockEmailSenderInstance
		);
		emailNotification.send();

		expect(MockEmailSenderInstance.sentData).toEqual({
			recipient: "test@gmail.com",
			subject: "Test Subject",
			body: "hello",
		});
	});
});
