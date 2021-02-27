import CommandbrdIdentifier from "./commandbrd-identifier";
interface TextArgumentIterator {
    next(): string;
    hasNext(): boolean;
}
declare type IdentifierType = CommandbrdIdentifier<any>;
export default class CommandbrdResolver {
    private readonly commands;
    constructor(commands: IdentifierType[]);
    resolve(textIterator: TextArgumentIterator): IdentifierType | undefined;
}
export {};
