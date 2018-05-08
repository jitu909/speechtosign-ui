import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeechModule } from '../lib';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SpeechModule
  ],
  providers: [{ provide: 'SPEECH_LANG', useValue: 'en-US' }],
  bootstrap: [AppComponent]
})
export class AppModule{ }
