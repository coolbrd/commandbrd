"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_tags_1 = require("common-tags");
var commandbrd_identifier_1 = __importDefault(require("../commandbrd-identifier"));
var CommandbrdIdentifierDiscord = /** @class */ (function (_super) {
    __extends(CommandbrdIdentifierDiscord, _super);
    function CommandbrdIdentifierDiscord(options) {
        var _this = _super.call(this, options) || this;
        _this.requiredPermissions = options.requiredPermissions ? options.requiredPermissions : [];
        _this.guildOnly = options.guildOnly !== undefined ? options.guildOnly : false;
        return _this;
    }
    CommandbrdIdentifierDiscord.prototype.prerun = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, permission;
            return __generator(this, function (_b) {
                if (this.guildOnly && !context.guild) {
                    context.reply("`" + this.primaryName + "` can only be used in servers.");
                    return [2 /*return*/, false];
                }
                if (context.member) {
                    for (_i = 0, _a = this.requiredPermissions; _i < _a.length; _i++) {
                        permission = _a[_i];
                        if (!context.member.hasPermission(permission)) {
                            context.reply("The `" + permission + "` is required to use this command.");
                            return [2 /*return*/, false];
                        }
                    }
                }
                return [2 /*return*/, true];
            });
        });
    };
    CommandbrdIdentifierDiscord.prototype.run = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var receipt, canRun, error_1, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receipt = this.newReceipt();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.prerun(context)];
                    case 2:
                        canRun = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error(common_tags_1.stripIndent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                There was an error running pre-run behavior before running a Discord command.\n\n                ", "\n            "], ["\n                There was an error running pre-run behavior before running a Discord command.\n\n                ", "\n            "])), error_1));
                    case 4:
                        if (!canRun) {
                            return [2 /*return*/, receipt];
                        }
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        return [4 /*yield*/, _super.prototype.run.call(this, context)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        error_2 = _a.sent();
                        throw new Error(common_tags_1.stripIndent(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                There was an error running a Discord command.\n\n                ", "\n            "], ["\n                There was an error running a Discord command.\n\n                ", "\n            "])), error_2));
                    case 8:
                        receipt.runSuccessful = true;
                        return [2 /*return*/, receipt];
                }
            });
        });
    };
    return CommandbrdIdentifierDiscord;
}(commandbrd_identifier_1.default));
exports.default = CommandbrdIdentifierDiscord;
var templateObject_1, templateObject_2;
