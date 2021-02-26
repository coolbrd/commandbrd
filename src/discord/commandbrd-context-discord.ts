import { Client, DMChannel, Guild, GuildMember, Message, MessageEmbed, NewsChannel, TextChannel, User } from "discord.js";

export default class CommandbrdContextDiscord {
    public readonly client: Client;
    public readonly channel: TextChannel | DMChannel | NewsChannel;
    public readonly sender: User;
    public readonly guild: Guild | null;
    public readonly member: GuildMember | null;

    constructor(message: Message) {
        this.client = message.client;
        this.channel = message.channel;
        this.sender = message.author;
        this.guild = message.guild;
        this.member = message.member;
    }

    public async reply(content: string | MessageEmbed): Promise<void> {
        await this.channel.send(content);
    }
}