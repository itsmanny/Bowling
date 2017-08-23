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
  rollCount: number = 0;
  framePos: number = 1;
  currentFrame: number = 1;
  rolls:Array<any> = [];
  scores:Array<any> = [];
  nextRollIsLast: boolean = false;
  lastFrame: boolean = false;

  constructor (
    private scoringService: ScoringService
  ) {}

  roll(score) {

    let endOfGame = () => {
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

  isSpare(score) {
    return score + this.scores[this.scores.length - 1] === 10;
  }

  isStrike(score) {
    return score === 10;
  }

  isLastFrame(framePos) {
    return framePos > 18;
  }

  isLastRollOfFrame() {
    return this.framePos % 2 === 0;
  }

  checkSpare(score) {
    if (this.isSpare(score)){
      this.scores.push('/');
    } else {
      this.scores.push(score);
    };
    this.currentFrame ++;
    this.framePos ++;
  }

  scoreCurrentRoll(score) {

    if (this.isLastFrame(this.framePos)) {
      this.lastFrame = true;
      if (this.framePos === 20) {
        console.log("2")
      } else if (this.framePos === 21) {
        console.log("3")
      }
      this.pushScore(score);
      this.framePos ++
    } else if (this.isStrike(score)) {
      this.pushScore(score);
      this.scores.push('X');
      this.currentFrame ++;
      this.framePos += 2;
    } else if (this.isLastRollOfFrame()) {
      this.nextRollIsLast = false;
      this.checkSpare(score);
    } else {
      this.nextRollIsLast = true;
      this.pushScore(score);
      this.framePos ++;
    }
    this.rollCount ++;

    // console.log('rollCount: ' + this.rollCount);
    // console.log('framePos: ' + this.framePos);
    // console.log(this.scores);
    // console.log(this.currentFrame);

  }

}
