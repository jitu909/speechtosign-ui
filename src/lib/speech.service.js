"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var operators_1 = require("rxjs/operators");
var DEFAULT_GRAMMAR = "#JSGF V1.0; grammar Digits;\npublic <Digits> = ( <digit> ) + ;\n<digit> = ( zero | one | two | three | four | five | six | seven | eight | nine );";
var SpeechService = /** @class */ (function () {
    function SpeechService(zone, lang) {
        var _this = this;
        this.zone = zone;
        this.lang = lang;
        this.message = new Subject_1.Subject();
        this.command = new Subject_1.Subject();
        this.commands = {};
        this.context = new BehaviorSubject_1.BehaviorSubject('');
        this.refreshGrammar = new BehaviorSubject_1.BehaviorSubject(false);
        this.started = new BehaviorSubject_1.BehaviorSubject(false);
        var SpeechRecognition = window['SpeechRecognition'] || window['webkitSpeechRecognition'];
        this.recognition = new SpeechRecognition();
        this.recognition.lang = lang;
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.recognition.continuous = true;
        this.recognition.onresult = function (event) {
            var message = {};
            var word = '';
            if (event.results) {
                var result = event.results[event.resultIndex];
                if (result.isFinal) {
                    if (result[0].confidence < 0.3) {
                        message = { error: true, message: 'Cannot recognize' };
                    }
                    else {
                        word = result[0].transcript.trim().toLowerCase();
                        message = { success: true, message: word };
                    }
                }
            }
            _this.zone.run(function () {
                if (message['error']) {
                    _this.message.error(message);
                }
                else {
                    _this.message.next(message);
                    var context = _this.getContextForWord(word);
                    if (context) {
                        _this.context.next(context);
                    }
                    else {
                        var isCommand = _this.commands[_this.context.value] && _this.commands[_this.context.value][word];
                        if (isCommand) {
                            _this.command.next({ context: _this.context.value, command: word });
                        }
                        else {
                            // try to match a global context command
                            var isGlobalCommand = _this.commands[''] && _this.commands[''][word];
                            if (isGlobalCommand) {
                                _this.command.next({ context: '', command: word });
                            }
                        }
                    }
                }
            });
        };
        this.recognition.onerror = function (error) {
            _this.zone.run(function () {
                _this.message.error(error);
            });
        };
        this.recognition.onstart = function () {
            _this.zone.run(function () {
                _this.started.next(true);
            });
        };
        this.recognition.onend = function () {
            _this.zone.run(function () {
                _this.started.next(false);
            });
        };
        this.refreshGrammar.pipe(operators_1.debounceTime(500)).subscribe(function () {
            _this.setGrammar();
        });
    }
    SpeechService.prototype.start = function () {
        this.recognition.start();
    };
    SpeechService.prototype.stop = function () {
        this.recognition.stop();
    };
    SpeechService.prototype.declareContext = function (context) {
        var contextKey = context.map(function (w) { return w.toLowerCase(); }).join('/');
        if (!this.commands[contextKey]) {
            this.commands[contextKey] = {};
        }
        this.refreshGrammar.next(true);
    };
    SpeechService.prototype.declareCommand = function (command, context) {
        var contextKey = context.map(function (w) { return w.toLowerCase(); }).join('/');
        if (!this.commands[contextKey]) {
            this.commands[contextKey] = {};
        }
        this.commands[contextKey][command.toLowerCase()] = true;
        this.refreshGrammar.next(true);
    };
    SpeechService.prototype.setContext = function (context) {
        var contextKey = context.map(function (w) { return w.toLowerCase(); }).join('/');
        this.context.next(contextKey);
    };
    SpeechService.prototype.getContextForWord = function (word) {
        // first try to match a subcontext of the current context
        var context = this.context.value ? this.context.value + '/' + word : word;
        if (this.commands[context]) {
            return context;
        }
        // then try top-level context
        if (this.commands[word]) {
            return word;
        }
    };
    SpeechService.prototype.setGrammar = function () {
        var _this = this;
        var SpeechGrammarList = window['SpeechGrammarList'] || window['webkitSpeechGrammarList'];
        var words = {};
        Object.keys(this.commands).forEach(function (context) {
            context.split('/').forEach(function (word) {
                words[word] = true;
            });
            Object.keys(_this.commands[context]).forEach(function (command) { return words[command] = true; });
        });
        var grammar = DEFAULT_GRAMMAR + ' public <command> = ' + Object.keys(words).join(' | ') + ' ;';
        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        this.recognition.grammars = speechRecognitionList;
    };
    SpeechService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject('SPEECH_LANG'))
    ], SpeechService);
    return SpeechService;
}());
exports.SpeechService = SpeechService;
