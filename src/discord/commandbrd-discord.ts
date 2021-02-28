import Commandbrd from "../commandbrd";
import CommandbrdContextDiscord from "./commandbrd-context-discord";

export default class CommandbrdDiscord<ContextType extends CommandbrdContextDiscord = CommandbrdContextDiscord> extends Commandbrd<ContextType> {}