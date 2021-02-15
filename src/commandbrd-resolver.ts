import Commandbrd from "./commandbrd";

interface TextArgumentIterator {
    next(): string;
    hasNext(): boolean;
}

export default class CommandbrdResolver {
    private readonly commands: Commandbrd[];

    constructor(commands: Commandbrd[]) {
        this.commands = commands;
    }

    public resolve(textIterator: TextArgumentIterator): Commandbrd | undefined {
        let command: Commandbrd | undefined;
        let commandList = this.commands;

        while (textIterator.hasNext()) {
            const commandName = textIterator.next().toLowerCase();
            const potentialCommand = commandList.find(command => command.names.includes(commandName));

            if (!potentialCommand) {
                break;
            }

            command = potentialCommand;
            commandList = command.subCommandInstances;
        }

        return command;
    }
}