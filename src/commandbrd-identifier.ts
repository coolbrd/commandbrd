import { stripIndent } from "common-tags";
import Commandbrd from "./commandbrd";

interface NewableCommandType<ContextType, CommandType> { new(identifier: CommandbrdIdentifier<ContextType>, context: ContextType): CommandType };

export interface RunReceipt {
    runSuccessful: boolean
}

export interface CommandbrdIdentifierOptions<ContextType> {
    names: string[],
    info?: string,
    usage?: string,
    subCommands?: CommandbrdIdentifier<ContextType>[],
    commandClass: NewableCommandType<ContextType, Commandbrd<ContextType>>
}

export default class CommandbrdIdentifier<ContextType> {
    public readonly names: string[];
    public readonly info: string;
    public readonly usage: string;
    public readonly subCommands: CommandbrdIdentifier<ContextType>[];
    public readonly CommandClass: NewableCommandType<ContextType, Commandbrd<ContextType>>;

    constructor(options: CommandbrdIdentifierOptions<ContextType>) {
        this.names = options.names;
        this.info = options.info ? options.info : "N/A";
        this.usage = options.usage ? options.usage : "N/A";
        this.subCommands = options.subCommands ? options.subCommands : [];
        this.CommandClass = options.commandClass;
    }

    public get primaryName(): string {
        return this.names[0];
    }

    public async run(context: ContextType): Promise<RunReceipt> {
        const receipt = this.newReceipt();
        const command = new this.CommandClass(this, context);

        try {
            await command.execute();
        }
        catch (error) {
            throw new Error(stripIndent`
                There was an error running a command.

                Command name: ${this.primaryName}

                ${error}
            `);
        }

        receipt.runSuccessful = true;
        return receipt;
    }

    protected newReceipt(): RunReceipt {
        return {
            runSuccessful: false
        };
    }
}