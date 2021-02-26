import { Client, Guild, Message, TextChannel } from "discord.js";
import CommandbrdContextDiscord from "../../../src/discord/commandbrd-context-discord";
import CommandbrdDiscord from "../../../src/discord/commandbrd-discord";
import CommandbrdIdentifierDiscord from "../../../src/discord/commandbrd-identifier-discord";

jest.mock("discord.js");

describe("obligatory commandbrd Discord test", () => {
    let mockClient: Client;
    let mockMessage: Message;

    beforeEach(() => {
        mockClient = new Client();
        mockMessage = new Message(mockClient, {}, new TextChannel(new Guild(mockClient, {}), {}));
    });

    it("should inialize", () => {
        const identifier = new CommandbrdIdentifierDiscord({ names: ["fake", "f"], commandClass: CommandbrdDiscord });
        const context = new CommandbrdContextDiscord(mockMessage);

        const commandbrd = new CommandbrdDiscord(identifier, context);

        expect(commandbrd).toBeDefined();
    });
});