import { stripIndent } from "common-tags";
import { PermissionString } from "discord.js";
import CommandbrdIdentifier, { CommandbrdIdentifierOptions, RunReceipt } from "../commandbrd-identifier";
import CommandbrdContextDiscord from "./commandbrd-context-discord";

export interface CommandbrdIdentifierDiscordOptions<ContextType extends CommandbrdContextDiscord = CommandbrdContextDiscord> extends CommandbrdIdentifierOptions<ContextType> {
    requiredPermissions?: PermissionString[],
    guildOnly?: boolean
}

export default class CommandbrdIdentifierDiscord<ContextType extends CommandbrdContextDiscord = CommandbrdContextDiscord> extends CommandbrdIdentifier<ContextType> {
    public readonly requiredPermissions: PermissionString[];
    public readonly guildOnly: boolean;

    constructor(options: CommandbrdIdentifierDiscordOptions<ContextType>) {
        super(options);
        this.requiredPermissions = options.requiredPermissions ? options.requiredPermissions : [];
        this.guildOnly = options.guildOnly !== undefined ? options.guildOnly : false;
    }

    private async prerun(context: ContextType): Promise<boolean> {
        if (this.guildOnly && !context.guild) {
            context.reply(`\`${this.primaryName}\` can only be used in servers.`);
            return false;
        }

        if (context.member) {
            for (const permission of this.requiredPermissions) {
                if (!context.member.hasPermission(permission)) {
                    context.reply(`The \`${permission}\` is required to use this command.`);
                    return false;
                }
            }
        }

        return true;
    }

    public async run(context: ContextType): Promise<RunReceipt> {
        const receipt = this.newReceipt();

        let canRun: boolean;
        try {
            canRun = await this.prerun(context);
        }
        catch (error) {
            throw new Error(stripIndent`
                There was an error running pre-run behavior before running a Discord command.

                ${error}
            `);
        }

        if (!canRun) {
            return receipt;
        }

        try {
            await super.run(context);
        }
        catch (error) {
            throw new Error(stripIndent`
                There was an error running a Discord command.

                ${error}
            `);
        }

        receipt.runSuccessful = true;
        return receipt;
    }
}