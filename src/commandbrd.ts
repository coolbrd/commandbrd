export default abstract class Commandbrd {
    public abstract readonly names: string[];
    public abstract readonly info: string;
    public abstract readonly usage: string;
    public readonly subcommands: Commandbrd[] = [];

    public abstract run(): Promise<void>;
}