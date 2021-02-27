"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandbrdResolver = /** @class */ (function () {
    function CommandbrdResolver(commands) {
        this.commands = commands;
    }
    CommandbrdResolver.prototype.resolve = function (textIterator) {
        var command;
        var commandList = this.commands;
        var _loop_1 = function () {
            var commandName = textIterator.next().toLowerCase();
            var potentialCommand = commandList.find(function (command) { return command.names.includes(commandName); });
            if (!potentialCommand) {
                return "break";
            }
            command = potentialCommand;
            commandList = command.subCommands;
        };
        while (textIterator.hasNext()) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        return command;
    };
    return CommandbrdResolver;
}());
exports.default = CommandbrdResolver;
