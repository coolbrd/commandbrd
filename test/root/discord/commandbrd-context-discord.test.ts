import { createMockedMessage } from "coolbrds-discord-mocks";
import { Message } from "discord.js";
import CommandbrdContextDiscord from "../../../src/discord/commandbrd-context-discord";

jest.mock("discord.js");

describe("commandbrd context Discord behavior", () => {
    let mockedMessage: Message;
    let mockedChannelSendSpy: jest.SpyInstance;

    beforeEach(() => {
        jest.resetAllMocks();

        mockedMessage = createMockedMessage();
        mockedChannelSendSpy = jest.spyOn(mockedMessage.channel, "send");
    });
    
    it("should initialize properly", () => {
        const context = new CommandbrdContextDiscord(mockedMessage);

        expect(context.client).toBe(mockedMessage.client);
        expect(context.channel).toBe(mockedMessage.channel);
        expect(context.sender).toBe(mockedMessage.author);
        expect(context.guild).toBe(mockedMessage.guild);
        expect(context.member).toBe(mockedMessage.member);
    });

    it("should send messages to the message's channel when issued a reply", async () => {
        const context = new CommandbrdContextDiscord(mockedMessage);

        expect(mockedChannelSendSpy).not.toBeCalled();
        await context.reply("Hi!");
        expect(mockedChannelSendSpy).toBeCalledTimes(1);
    });
});