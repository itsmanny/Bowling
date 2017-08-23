import { Injectable } from '@angular/core';

@Injectable()
export class ScoringService {

  constructor() { }

  calc(rolls, frame) {
    var score = 0;
    var frameStart = 0;

    let isStrike = () => {
      return rolls[frameStart] === 10;
    };

    let isSpare = () => {
      return rolls[frameStart] + rolls[frameStart + 1] === 10;
    };

    let framePoints = () => {
      return rolls[frameStart] + rolls[frameStart + 1] || 0;
    };

    let strikeBonus = () => {
      return rolls[frameStart + 1] + rolls[frameStart + 2] || 0;
    };

    let spareBonus = () => {
      return rolls[frameStart + 2] || 0;
    };

    for (var i = 0; i < frame; i ++){
      if(isStrike()){
        score += 10 + strikeBonus();
        frameStart ++;
      } else if (isSpare()){
        score += 10 + spareBonus();
        frameStart += 2;
      } else {
        score += framePoints();
        frameStart += 2;
      };
    };
    return score;
  }

}
