import CommandbrdIdentifier from "./commandbrd-identifier";

export default class Commandbrd {
    public readonly identifier: CommandbrdIdentifier;

    constructor(identifier: CommandbrdIdentifier) {
        this.identifier = identifier;
    }

    public async execute(): Promise<void> {}

    public async unexecute(): Promise<void> {
        throw new Error("This command cannot be un-executed.");
    }
}