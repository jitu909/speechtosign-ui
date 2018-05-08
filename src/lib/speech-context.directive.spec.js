"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var speech_context_directive_1 = require("./speech-context.directive");
var speech_service_1 = require("./speech.service");
describe('SpeechContextDirective', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                speech_service_1.SpeechService,
                { provide: 'SPEECH_LANG', useValue: 'en-US' },
            ],
        });
    });
    it('should create an instance', testing_1.inject([speech_service_1.SpeechService], function (service) {
        var directive = new speech_context_directive_1.SpeechContextDirective(service);
        expect(directive).toBeTruthy();
    }));
});
