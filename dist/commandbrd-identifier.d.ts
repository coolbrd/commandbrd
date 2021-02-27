import Commandbrd from "./commandbrd";
interface NewableCommandType<ContextType, CommandType> {
    new (identifier: CommandbrdIdentifier<ContextType>, context: ContextType): CommandType;
}
export interface RunReceipt {
    runSuccessful: boolean;
}
export interface CommandbrdIdentifierOptions<ContextType> {
    names: string[];
    info?: string;
    usage?: string;
    subCommands?: CommandbrdIdentifier<ContextType>[];
    commandClass: NewableCommandType<ContextType, Commandbrd<ContextType>>;
}
export default class CommandbrdIdentifier<ContextType> {
    readonly names: string[];
    readonly info: string;
    readonly usage: string;
    readonly subCommands: CommandbrdIdentifier<ContextType>[];
    readonly CommandClass: NewableCommandType<ContextType, Commandbrd<ContextType>>;
    constructor(options: CommandbrdIdentifierOptions<ContextType>);
    get primaryName(): string;
    run(context: ContextType): Promise<RunReceipt>;
    protected newReceipt(): RunReceipt;
}
export {};
