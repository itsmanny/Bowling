import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScoringService } from './scoring.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ScoringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
