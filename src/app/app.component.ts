"use strict";
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechService } from '../lib';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SpeechRecognitionService } from './speech-recognition.service';
interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 export class AppComponent{
 	 voiceData: string;

    constructor(private speechRecognitionService: SpeechRecognitionService) {     
        this.voiceData = "";
    }
    ngOnInit() {
        console.log("hello")
    }
    ngOnDestroy(){
    	this.speechRecognitionService.DestroySpeechObject();
    }
    startConverting(){
    	this.speechRecognitionService.record()
  	    .subscribe(
  	    //listener
  	    (value) => {
  	    this.voiceData = value;
  	    console.log(value);
  	    }
  	}   
  title = 'Machine Translation Architecture From Speech to Sign Language';
  getData(data:string){
	if(data==""){
		alert("This field can't be empty");
	}else{
		console.log(data);
	}
	
  }
  clearData:string = '';
  clearSearch() {
    this.clearData = "";
  }
 
	writeToFile(){
    var f='../write.txt';
	fs.writeFile(f,'Some text to write.');
  	console.log('Written!');
	}
}
// private fs = require('fs');
   //subscription: Subscription;
   // ngOnInit(){
  // 	// this.speech.start();
  // 	// this.speech.message.subscribe(msg=>{
  // 	// 	this.voiceData=msg.message;
  // 	// 	console.log(this.voiceData);
  // 	// })
  // }
  //  startConverting(){
 //  	this.speech.start();
 //  	this.speech.message.subscribe(msg=>{
 //  	this.voiceData=msg.message;
 //  		console.log(this.voiceData);
 //  	})
	// }
	// onSubmit = function(speechOutput){
	 //  console.log(speechOutput);
  // }