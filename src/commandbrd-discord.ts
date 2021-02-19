import { Client } from "discord.js";
import Commandbrd from "./commandbrd";

interface ConcreteCommandbrdDiscordClass extends CommandbrdDiscord { new(...args: any): CommandbrdDiscord };

export default abstract class CommandbrdDiscord extends Commandbrd {
    protected readonly subCommands: ConcreteCommandbrdDiscordClass[] = [];
    public subCommandInstances: CommandbrdDiscord[] = [];

    private readonly client: Client;

    constructor(client: Client) {
        super();
        this.client = client;
    }

    protected newCommand(commandClass: ConcreteCommandbrdDiscordClass): CommandbrdDiscord {
        return new commandClass(this.client);
    }
}