import CommandbrdIdentifier from "./commandbrd-identifier";
export default class Commandbrd<ContextType> {
    readonly identifier: CommandbrdIdentifier<ContextType>;
    readonly context: ContextType;
    constructor(identifier: CommandbrdIdentifier<ContextType>, context: ContextType);
    execute(): Promise<void>;
    unexecute(): Promise<void>;
}
