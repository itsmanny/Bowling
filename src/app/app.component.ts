import { Component } from '@angular/core';

import { ScoringService } from './scoring.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bowling Game';

  score: number = 0;
  rollCount: number = 0; // rolls counter
  framePos: number = 1; // frame position
  currentFrame: number = 1; // frame of the current roll
  rolls:Array<any> = []; // array of rolls
  scores:Array<any> = []; // array of scores
  nextRollIsLast: boolean = false; // is next roll the last of frame?
  lastFrame: boolean = false; // is this the last frame?

  constructor (
    private scoringService: ScoringService
  ) {}

  roll(score) {

    let endOfGame = () => {
      // TODO: complete this method
      return this.nextRollIsLast && this.lastFrame;
    };

    let throwError = () => {
      alert("End of the game!");
    };

    if (endOfGame()){
      throwError();
    } else {
      this.score = score;
      this.rolls.push(score);
      this.scoreCurrentRoll(score);

    };

  }

  pushScore(score) {
    this.scores.push(score);
  }

  isSpare(score) { // check if it's a spare
    return score + this.scores[this.scores.length - 1] === 10;
  }

  isStrike(score) { // check if it's a strike
    return score === 10;
  }

  isLastFrame(framePos) { // check if current frame is last frame
    return framePos > 18;
  }

  isLastRollOfFrame() { // check if current roll is last of frame
    return this.framePos % 2 === 0;
  }

  checkSpare(score) { // if it's a spare add '/' to scores array
    if (this.isSpare(score)){
      this.scores.push('/');
    } else {
      this.scores.push(score);
    };
    // move to next frame
    this.currentFrame ++;
    this.framePos ++;
  }

  scoreCurrentRoll(score) { // attribute correct points for current roll

    if (this.isLastFrame(this.framePos)) {
      this.lastFrame = true;
      if (this.framePos === 20) { // TODO: handle different behaviours of last frame
        console.log("2")
      } else if (this.framePos === 21) {
        console.log("3")
      }
      this.pushScore(score);
      this.framePos ++
    } else if (this.isStrike(score)) { // if it's a strike add 'X' to scores array and move to next frame
      this.pushScore(score);
      this.scores.push('X');
      this.currentFrame ++;
      this.framePos += 2;
    } else if (this.isLastRollOfFrame()) { // if it's second roll of frame, check if it's a spare
      this.nextRollIsLast = false;
      this.checkSpare(score);
    } else { // simply add points and increase framePos for other scenarios
      this.nextRollIsLast = true;
      this.pushScore(score);
      this.framePos ++;
    }
    this.rollCount ++;

  }

}
