import Commandbrd from "../../src/commandbrd";
import CommandbrdResolver from "../../src/commandbrd-resolver";

describe("Resolver behavior", () => {
    let resolver: CommandbrdResolver;

    beforeEach(() => {
        const command1 = new FakeCommandBrd1;
        command1.init();
        const command2 = new FakeCommandBrd2;
        command2.init();

        resolver = new CommandbrdResolver([command1, command2]);
    });

    it("should resolve top-level commands", () => {
        let text = new TestTextIterator("fake1");
        expect(resolver.resolve(text)).toBeInstanceOf(FakeCommandBrd1);

        text = new TestTextIterator("fake2");
        expect(resolver.resolve(text)).toBeInstanceOf(FakeCommandBrd2);
    });

    it("should resolve 2nd level commands", () => {
        let text = new TestTextIterator("f2 sub1");
        expect(resolver.resolve(text)).toBeInstanceOf(FakeCommandbrd2Sub1);
    });

    it("should resolve to the closest possible valid command", () => {
        let text = new TestTextIterator("fake1 invalid1 invalid2");
        expect(resolver.resolve(text)).toBeInstanceOf(FakeCommandBrd1);
    });

    it("should not resolve invalid command names", () => {
        let text = new TestTextIterator("invalid");
        expect(resolver.resolve(text)).toBeUndefined();
    });
});

class TestTextIterator {
    private readonly text: string[];
    
    constructor(text: string) {
        this.text = text.split(" ");
    }

    public hasNext(): boolean {
        return this.text.length > 0;
    }

    public next(): string {
        if (!this.hasNext()) {
            throw new Error("No more text to iterate.");
        }

        return this.text.shift() as string;
    }
}

class FakeCommandBrd1 extends Commandbrd {
    public readonly names = ["fake1", "f1"];
    public readonly info = "N/A";
    public readonly usage = "N/A";

    public async run(): Promise<void> {
        return;
    }
}

class FakeCommandBrd2 extends Commandbrd {
    public readonly names = ["fake2", "f2"];
    public readonly info = "N/A";
    public readonly usage = "N/A";
    public readonly subCommands = [FakeCommandbrd2Sub1];

    public async run(): Promise<void> {
        return;
    }
}

class FakeCommandbrd2Sub1 extends Commandbrd {
    public readonly names = ["sub1", "s1"];
    public readonly info = "N/A";
    public readonly usage = "N/A";

    public async run(): Promise<void> {
        return;
    }
}