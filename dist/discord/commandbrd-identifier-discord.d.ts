import { PermissionString } from "discord.js";
import CommandbrdIdentifier, { CommandbrdIdentifierOptions, RunReceipt } from "../commandbrd-identifier";
import CommandbrdContextDiscord from "./commandbrd-context-discord";
export interface CommandbrdIdentifierDiscordOptions<ContextType extends CommandbrdContextDiscord> extends CommandbrdIdentifierOptions<ContextType> {
    requiredPermissions?: PermissionString[];
    guildOnly?: boolean;
}
export default class CommandbrdIdentifierDiscord<ContextType extends CommandbrdContextDiscord> extends CommandbrdIdentifier<ContextType> {
    readonly requiredPermissions: PermissionString[];
    readonly guildOnly: boolean;
    constructor(options: CommandbrdIdentifierDiscordOptions<ContextType>);
    private prerun;
    run(context: ContextType): Promise<RunReceipt>;
}
