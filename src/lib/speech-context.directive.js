"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SpeechContextDirective = /** @class */ (function () {
    function SpeechContextDirective(speech) {
        this.speech = speech;
    }
    SpeechContextDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.speech.declareContext(this.ngSpeechContext);
        var localContext = this.ngSpeechContext.map(function (w) { return w.toLowerCase(); });
        this.subscription = this.speech.context.subscribe(function (context) {
            if (context === localContext.join('/')) {
                _this.speechClass = 'speech-active-context';
            }
            else if (context === localContext.slice(0, -1).join('/')) {
                _this.speechClass = 'speech-active-context-child';
            }
            else if (context.startsWith(localContext.join('/'))) {
                _this.speechClass = 'speech-active-context-ancestor';
            }
            else {
                _this.speechClass = '';
            }
        });
    };
    SpeechContextDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Input()
    ], SpeechContextDirective.prototype, "ngSpeechContext", void 0);
    __decorate([
        core_1.HostBinding('class')
    ], SpeechContextDirective.prototype, "speechClass", void 0);
    SpeechContextDirective = __decorate([
        core_1.Directive({
            selector: '[ngSpeechContext]'
        })
    ], SpeechContextDirective);
    return SpeechContextDirective;
}());
exports.SpeechContextDirective = SpeechContextDirective;
