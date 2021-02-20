import CommandbrdIdentifier from "./commandbrd/commandbrd-identifier";

interface TextArgumentIterator {
    next(): string;
    hasNext(): boolean;
}

export default class CommandbrdResolver {
    private readonly commands: CommandbrdIdentifier[];

    constructor(commands: CommandbrdIdentifier[]) {
        this.commands = commands;
    }

    public resolve(textIterator: TextArgumentIterator): CommandbrdIdentifier | undefined {
        let command: CommandbrdIdentifier | undefined;
        let commandList = this.commands;

        while (textIterator.hasNext()) {
            const commandName = textIterator.next().toLowerCase();
            const potentialCommand = commandList.find(command => command.names.includes(commandName));

            if (!potentialCommand) {
                break;
            }

            command = potentialCommand;
            commandList = command.subCommands;
        }

        return command;
    }
}