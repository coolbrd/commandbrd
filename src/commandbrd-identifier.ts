import { stripIndent } from "common-tags";
import Commandbrd from "./commandbrd";

interface NewableCommandType<ContextType, CommandType> { new(identifier: CommandbrdIdentifier<ContextType>, context: ContextType): CommandType };

export default class CommandbrdIdentifier<ContextType> {
    public readonly names: string[];
    public readonly info: string;
    public readonly usage: string;
    public readonly subCommands: CommandbrdIdentifier<ContextType>[];
    public readonly CommandClass: NewableCommandType<ContextType, Commandbrd<ContextType>>;

    constructor(
        names: string[],
        info: string,
        usage: string,
        subCommands: CommandbrdIdentifier<ContextType>[],
        commandClass: NewableCommandType<ContextType, Commandbrd<ContextType>>)
    {
        this.names = names;
        this.info = info;
        this.usage = usage;
        this.subCommands = subCommands;
        this.CommandClass = commandClass;
    }

    public get primaryName(): string {
        return this.names[0];
    }

    public async run(context: ContextType): Promise<void> {
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
    }
}