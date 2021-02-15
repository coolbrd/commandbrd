interface ConcreteCommandbrdClass<T extends Commandbrd> { new(): T };

export default abstract class Commandbrd {
    public abstract readonly names: string[];
    public abstract readonly info: string;
    public abstract readonly usage: string;

    protected readonly subCommands: ConcreteCommandbrdClass<Commandbrd>[] = [];
    
    public subCommandInstances: Commandbrd[] = [];

    public init(): void {
        this.subCommandInstances = this.subCommands.map(commandClass => Commandbrd.newCommand(commandClass));
    }

    public static newCommand<T extends Commandbrd>(commandClass: ConcreteCommandbrdClass<T>): T {
        const commandbrd = new commandClass();
        commandbrd.init();

        return commandbrd;
    }

    public abstract run(): Promise<void>;
}