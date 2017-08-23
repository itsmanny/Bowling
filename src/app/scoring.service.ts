import { Injectable } from '@angular/core';

@Injectable()
export class ScoringService {

  constructor() { }

  calc(rolls, frame) {
    var score = 0;
    var frameStart = 0;

    // check if the score is 10
    let isStrike = () => {
      return rolls[frameStart] === 10;
    };

    // check if the sum if the score + the previous score is 10
    let isSpare = () => {
      return rolls[frameStart] + rolls[frameStart + 1] === 10;
    };

    // total points of frame
    let framePoints = () => {
      return rolls[frameStart] + rolls[frameStart + 1] || 0;
    };

    // extra points awarded for a strike
    let strikeBonus = () => {
      return rolls[frameStart + 1] + rolls[frameStart + 2] || 0;
    };

    // extra points awarded for a spare
    let spareBonus = () => {
      return rolls[frameStart + 2] || 0;
    };

    // loop through the frames
    for (var i = 0; i < frame; i ++){
      // if it's a strike add 10pts + strikeBonus
      if(isStrike()){
        score += 10 + strikeBonus();
        frameStart ++;
      // if it's a spare add 10pts + spareBonus
      } else if (isSpare()){
        score += 10 + spareBonus();
        frameStart += 2;
      // otherwise add the points of frame
      } else {
        score += framePoints();
        frameStart += 2;
      };
    };
    return score;
  }

}
