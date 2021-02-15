import Commandbrd from "../../src/commandbrd";

class FakeCommandbrd1 extends Commandbrd {
    public readonly names = ["fake1", "f1"];
    public readonly info = "N/A";
    public readonly usage = "N/A";
    public readonly subCommands = [FakeCommandBrd1Sub1];

    public async run(): Promise<void> {}
}

class FakeCommandBrd1Sub1 extends Commandbrd {
    public readonly names = ["sub1", "s1"];
    public readonly info = "N/A";
    public readonly usage = "N/A";

    public async run(): Promise<void> {}
}

describe("Commandbrd initialization", () => {
    let commandbrd: Commandbrd;

    beforeEach(() => {
        commandbrd = Commandbrd.newCommand(FakeCommandbrd1);
    });

    it("should have an initialized subcommand", () => {
        expect(commandbrd.subCommandInstances.length).toBe(1);
        expect(commandbrd.subCommandInstances[0]).toBeInstanceOf(FakeCommandBrd1Sub1);
    });
});