"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var speech_action_directive_1 = require("./speech-action.directive");
var speech_service_1 = require("./speech.service");
var speech_context_directive_1 = require("./speech-context.directive");
var SpeechModule = /** @class */ (function () {
    function SpeechModule() {
    }
    SpeechModule = __decorate([
        core_1.NgModule({
            declarations: [
                speech_action_directive_1.SpeechActionDirective,
                speech_context_directive_1.SpeechContextDirective,
            ],
            imports: [
                common_1.CommonModule,
            ],
            providers: [speech_service_1.SpeechService],
            exports: [
                speech_action_directive_1.SpeechActionDirective,
                speech_context_directive_1.SpeechContextDirective,
            ],
        })
    ], SpeechModule);
    return SpeechModule;
}());
exports.SpeechModule = SpeechModule;
