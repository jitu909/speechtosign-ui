"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    //subscription: Subscription;
    function AppComponent(speech) {
        this.speech = speech;
        // private fs = require('fs');
        this.voiceData = '';
        // ngOnInit(){
        // 	// this.speech.start();
        // 	// this.speech.message.subscribe(msg=>{
        // 	// 	this.voiceData=msg.message;
        // 	// 	console.log(this.voiceData);
        // 	// })
        // }
        this.title = 'Machine Translation Architecture From Speech to Sign Language';
        this.clearData = '';
    }
    // onSubmit = function(speechOutput){
    //  console.log(speechOutput);
    // }
    AppComponent.prototype.getData = function (data) {
        if (data == "") {
            alert("This field can't be empty");
        }
        else {
            console.log(data);
        }
    };
    AppComponent.prototype.clearSearch = function () {
        this.clearData = "";
    };
    //  startConverting(){
    //  	this.speech.start();
    //  	this.speech.message.subscribe(msg=>{
    //  	this.voiceData=msg.message;
    //  		console.log(this.voiceData);
    //  	})
    // }
    AppComponent.prototype.writeToFile = function () {
        var fs = require('fs');
        fs.writeFile("../test.txt", "Hey there!");
        console.log("The file was saved!");
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
