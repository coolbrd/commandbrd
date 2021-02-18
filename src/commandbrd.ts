interface ConcreteCommandbrdClass<T extends Commandbrd> { new(...args: any): T };

export default abstract class Commandbrd {
    public abstract readonly names: string[];
    public abstract readonly info: string;
    public abstract readonly usage: string;

    public abstract run(): Promise<void>;

    protected readonly subCommands: ConcreteCommandbrdClass<Commandbrd>[] = [];
    public subCommandInstances: Commandbrd[] = [];

    public init(): void {
        this.subCommandInstances = this.subCommands.map(commandClass => {
            const newCommand = this.newCommand(commandClass);
            newCommand.init();

            return newCommand;
        });
    }

    protected newCommand(commandClass: ConcreteCommandbrdClass<Commandbrd>): Commandbrd {
        return new commandClass();
    }
}