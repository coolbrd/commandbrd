import Commandbrd from "../../src/commandbrd";
import CommandbrdIdentifier from "../../src/commandbrd-identifier";

const commandbrdIdentifier = new CommandbrdIdentifier({
    names: ["fake1", "f1"],
    commandClass: Commandbrd
});

describe("commandbrd initialization", () => {
    it("should should save its identifier", () => {
        const commandbrd = new Commandbrd(commandbrdIdentifier, {});

        expect(commandbrd.identifier).toBe(commandbrdIdentifier);
    });
});

describe("commandbrd default implementation", () => {
    it("should throw an error when attempted to un-execute", async () => {
        const commandbrd = new Commandbrd(commandbrdIdentifier, {});

        expect(commandbrd.unexecute()).rejects.toThrow();
    });

    it("should execute nothing by default", async () => {
        const commandbrd = new Commandbrd(commandbrdIdentifier, {});

        expect(commandbrd.execute()).resolves.not.toThrow();
    });
});