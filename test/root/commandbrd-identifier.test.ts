import Commandbrd from "../../src/commandbrd";
import CommandbrdIdentifier from "../../src/commandbrd-identifier";

jest.mock("../../src/commandbrd");

describe("command running behavior", () => {
    let commandbrd: CommandbrdIdentifier;

    beforeEach(() => {
        commandbrd = new CommandbrdIdentifier({
            names: ["fake1", "f1"],
            info: "N/A",
            usage: "N/A",
            commandClass: Commandbrd
        });

        jest.resetAllMocks();
    });

    it("should initialize a new command instance with every execution", async () => {
        expect(Commandbrd).not.toBeCalled();
        await commandbrd.run({});
        expect(Commandbrd).toBeCalledTimes(1);
        await commandbrd.run({});
        expect(Commandbrd).toBeCalledTimes(2);
    });

    it("should throw an error when running the command throws", () => {
        jest.spyOn(Commandbrd.prototype, "execute").mockImplementation(() => { throw new Error("Test error") });

        expect(commandbrd.run({})).rejects.toThrow();
    });
});