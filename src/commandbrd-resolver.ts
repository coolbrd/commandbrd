import CommandbrdIdentifier from "./commandbrd-identifier";

interface TextArgumentIterator {
    next(): string;
    hasNext(): boolean;
}

type IdentifierType = CommandbrdIdentifier<any>;

export default class CommandbrdResolver {
    private readonly commands: IdentifierType[];

    constructor(commands: IdentifierType[]) {
        this.commands = commands;
    }

    public resolve(textIterator: TextArgumentIterator): IdentifierType | undefined {
        let command: IdentifierType | undefined;
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