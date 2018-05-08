"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var speech_action_directive_1 = require("./speech-action.directive");
var speech_service_1 = require("./speech.service");
describe('SpeechActionDirective', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                speech_service_1.SpeechService,
                { provide: 'SPEECH_LANG', useValue: 'en-US' },
                core_1.ViewContainerRef,
            ],
        });
    });
    it('should create an instance', testing_1.inject([speech_service_1.SpeechService, core_1.ViewContainerRef], function (service, viewContainer) {
        var directive = new speech_action_directive_1.SpeechActionDirective(viewContainer, service);
        expect(directive).toBeTruthy();
    }));
});
