import CommandbrdIdentifier from "./commandbrd-identifier";

export default class Commandbrd<ContextType> {
    public readonly identifier: CommandbrdIdentifier<ContextType>;
    public readonly context: ContextType;

    constructor(identifier: CommandbrdIdentifier<ContextType>, context: ContextType) {
        this.identifier = identifier;
        this.context = context;
    }

    public async execute(): Promise<void> {}

    public async unexecute(): Promise<void> {
        throw new Error("This command cannot be un-executed.");
    }
}