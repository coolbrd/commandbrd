import { Client, DMChannel, Guild, GuildMember, Message, MessageEmbed, NewsChannel, TextChannel, User } from "discord.js";
export default class CommandbrdContextDiscord {
    readonly client: Client;
    readonly channel: TextChannel | DMChannel | NewsChannel;
    readonly sender: User;
    readonly guild: Guild | null;
    readonly member: GuildMember | null;
    constructor(message: Message);
    reply(content: string | MessageEmbed): Promise<void>;
}
