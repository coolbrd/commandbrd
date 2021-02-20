import CommandbrdResolver from "../../src/commandbrd-resolver";
import Commandbrd from "../../src/commandbrd";
import CommandbrdIdentifier from "../../src/commandbrd-identifier";

const fakeCommandBrd1 = new CommandbrdIdentifier(
    ["fake1", "f1"],
    "N/A",
    "N/A",
    [],
    Commandbrd
);

const fakeCommandBrd2Sub1 = new CommandbrdIdentifier(
    ["sub1", "s1"],
    "N/A",
    "N/A",
    [],
    Commandbrd
);

const fakeCommandBrd2 = new CommandbrdIdentifier(
    ["fake2", "f2"],
    "N/A",
    "N/A",
    [fakeCommandBrd2Sub1],
    Commandbrd
);

describe("Resolver behavior", () => {
    let resolver: CommandbrdResolver;

    beforeEach(() => {
        resolver = new CommandbrdResolver([fakeCommandBrd1, fakeCommandBrd2]);
    });

    it("should resolve top-level commands", () => {
        let text = new TestTextIterator("fake1");
        expect(resolver.resolve(text)?.primaryName).toBe("fake1");

        text = new TestTextIterator("fake2");
        expect(resolver.resolve(text)?.primaryName).toBe("fake2");
    });

    it("should resolve 2nd level commands", () => {
        let text = new TestTextIterator("f2 sub1");
        expect(resolver.resolve(text)?.primaryName).toBe("sub1");
    });

    it("should resolve to the closest possible valid command", () => {
        let text = new TestTextIterator("fake1 invalid1 invalid2");
        expect(resolver.resolve(text)?.primaryName).toBe("fake1");
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