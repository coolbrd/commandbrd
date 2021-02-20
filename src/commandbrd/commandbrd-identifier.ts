import { stripIndent } from "common-tags";
import Commandbrd from "./commandbrd";

export default class CommandbrdIdentifier {
    public readonly names: string[];
    public readonly info: string;
    public readonly usage: string;
    public readonly subCommands: CommandbrdIdentifier[];
    public readonly CommandClass: typeof Commandbrd;

    constructor(
        names: string[],
        info: string,
        usage: string,
        subCommands: CommandbrdIdentifier[],
        commandClass: typeof Commandbrd) {
        this.names = names;
        this.info = info;
        this.usage = usage;
        this.subCommands = subCommands;
        this.CommandClass = commandClass;
    }

    public get primaryName(): string {
        return this.names[0];
    }

    public async run(): Promise<void> {
        const command = new this.CommandClass(this);

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