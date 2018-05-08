"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SpeechActionDirective = /** @class */ (function () {
    function SpeechActionDirective(_view, speech) {
        this._view = _view;
        this.speech = speech;
        this.ngSpeechActionContext = [];
    }
    SpeechActionDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.speech.declareCommand(this.ngSpeechActionCommand, this.ngSpeechActionContext);
        this.subscription = this.speech.command.subscribe(function (command) {
            if (_this.match(command)) {
                var component = _this._view.injector.view.component;
                _this.ngSpeechAction.bind(component)();
            }
        });
    };
    SpeechActionDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SpeechActionDirective.prototype.match = function (command) {
        var context = this.ngSpeechActionContext.map(function (w) { return w.toLowerCase(); }).join('/');
        return command.context === context && command.command === this.ngSpeechActionCommand.toLowerCase();
    };
    __decorate([
        core_1.Input()
    ], SpeechActionDirective.prototype, "ngSpeechAction", void 0);
    __decorate([
        core_1.Input()
    ], SpeechActionDirective.prototype, "ngSpeechActionCommand", void 0);
    __decorate([
        core_1.Input()
    ], SpeechActionDirective.prototype, "ngSpeechActionContext", void 0);
    SpeechActionDirective = __decorate([
        core_1.Directive({
            selector: '[ngSpeechAction]'
        })
    ], SpeechActionDirective);
    return SpeechActionDirective;
}());
exports.SpeechActionDirective = SpeechActionDirective;
