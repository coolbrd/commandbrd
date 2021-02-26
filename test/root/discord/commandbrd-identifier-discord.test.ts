import { createMockedMessage } from "coolbrds-discord-mocks";
import { GuildMember, Message } from "discord.js";
import CommandbrdContextDiscord from "../../../src/discord/commandbrd-context-discord";
import CommandbrdDiscord from "../../../src/discord/commandbrd-discord";
import CommandbrdIdentifierDiscord from "../../../src/discord/commandbrd-identifier-discord";

jest.mock("discord.js");

describe("commandbrd identifier Discord general behavior", () => {
    let mockedMessage: Message;

    beforeEach(() => {
        jest.resetAllMocks();

        mockedMessage = createMockedMessage();
    });

    it("should initialize properly", () => {
        const identifier = new CommandbrdIdentifierDiscord({
            names: ["fake", "f1"],
            requiredPermissions: ["MANAGE_CHANNELS"],
            guildOnly: true,
            commandClass: CommandbrdDiscord
        });

        expect(identifier.requiredPermissions.includes("MANAGE_CHANNELS")).toBe(true);
        expect(identifier.guildOnly).toBe(true);
    });
});

describe("commandbrd identifier Discord prerun behavior", () => {
    let mockedMessage: Message;
    let mockedMemberHasPermission: jest.SpyInstance;

    beforeEach(() => {
        jest.resetAllMocks();

        mockedMessage = createMockedMessage();
        mockedMemberHasPermission = jest.spyOn(mockedMessage.member as GuildMember, "hasPermission");
    });

    it("should not let guild commands run outside of a guild", async () => {
        mockedMessage = createMockedMessage({ guild: null });

        const identifier = new CommandbrdIdentifierDiscord({
            names: ["fake1", "f1"],
            guildOnly: true,
            commandClass: CommandbrdDiscord
        });

        const context = new CommandbrdContextDiscord(mockedMessage);
        const receipt = await identifier.run(context);

        expect(receipt.runSuccessful).toBe(false);
    });

    it("should run a command only when the user has ample permissions to do so", async () => {
        mockedMemberHasPermission.mockImplementation(() => false);

        const identifier = new CommandbrdIdentifierDiscord({
            names: ["fake1", "f1"],
            requiredPermissions: ["MANAGE_CHANNELS"],
            commandClass: CommandbrdDiscord
        });

        const context = new CommandbrdContextDiscord(mockedMessage);
        let receipt = await identifier.run(context);

        expect(receipt.runSuccessful).toBe(false);

        mockedMemberHasPermission.mockImplementation(() => true);
        receipt = await identifier.run(context);

        expect(receipt.runSuccessful).toBe(true);
    });

    it("should only check for permissions when the context has a member", async () => {
        mockedMessage = createMockedMessage({ member: null });
        
        const identifier = new CommandbrdIdentifierDiscord({
            names: ["fake1", "f1"],
            requiredPermissions: ["MANAGE_CHANNELS"],
            commandClass: CommandbrdDiscord
        });

        const context = new CommandbrdContextDiscord(mockedMessage);
        await identifier.run(context);

        expect(mockedMemberHasPermission).not.toBeCalled();
    });

    it("should throw up the chain if a run condition fails", () => {
        mockedMemberHasPermission.mockImplementation(() => { throw new Error("Test error") });

        const identifier = new CommandbrdIdentifierDiscord({
            names: ["fake1", "f1"],
            requiredPermissions: ["MANAGE_CHANNELS"],
            commandClass: CommandbrdDiscord
        });

        const context = new CommandbrdContextDiscord(mockedMessage);

        expect(identifier.run(context)).rejects.toThrow();

        const errorIdentifier = new CommandbrdIdentifierDiscord({
            names: ["fake2", "f2"],
            commandClass: ErrorProneCommandbrd
        });

        expect(errorIdentifier.run(context)).rejects.toThrow();
    });
});

class ErrorProneCommandbrd extends CommandbrdDiscord<CommandbrdContextDiscord> {
    public async execute(): Promise<void> {
        throw new Error("Test error");
    }
}