import { TestBed, async } from '@angular/core/testing';

import { ScoringService } from './scoring.service';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let app;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        ScoringService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(app.title).toEqual('Bowling Game');
  }));

  describe('pushScore()', () => {
    let score = 2;
    it('push the score to the scores array', () => {
      app.scores = [];
      app.pushScore(score);
      expect(app.scores.length).toEqual(1);
      expect(app.scores[0]).toBe(score);
    });
  });

  describe('isSpare()', () => {
    let score1 = 7;
    let score2 = 6;
    it('should return true if current score + previous score === 10', () => {
      app.scores = [3];
      expect(app.isSpare(score1)).toBeTruthy();
    });
    it('should return false if current score + previous score !== 10', () => {
      app.scores = [3];
      expect(app.isSpare(score2)).toBeFalsy();
    });
  });

  describe('isStrike()', () => {
    let score1 = 10;
    let score2 = 9;
    it('should return true only if the score is 10', () => {
      expect(app.isStrike(score1)).toBeTruthy();
    });
    it('should return false if the score is not 10', () => {
      expect(app.isStrike(score2)).toBeFalsy();
    });
  });

  describe('isLastFrame()', () => {
    let pos1 = 15;
    let pos2 = 19;
    it('should return true if we are in the last frame', () => {
      expect(app.isLastFrame(pos2)).toBeTruthy();
    });
    it('should return false if we are not in the last frame', () => {
      expect(app.isLastFrame(pos1)).toBeFalsy();
    });
  });

  describe('isLastRollOfFrame()', () => {
    it('should return true if the current roll is the last of the frame', () => {
      app.framePos = 2;
      expect(app.isLastRollOfFrame()).toBeTruthy();
    });
    it('should return true if the current roll is the last of the frame', () => {
      app.framePos = 1;
      expect(app.isLastRollOfFrame()).toBeFalsy();
    });
  });

  describe('checkSpare()', () => {
    it('should push "/" to the scores array is it\'s a spare', () => {
      app.scores = [9];
      let score = 1;
      app.checkSpare(score);
      expect(app.scores).toEqual([9,'/']);
    });
    it('should push score to the scores array is it\'s a spare', () => {
      app.scores = [8];
      let score = 1;
      app.checkSpare(score);
      expect(app.scores).toEqual([8,1]);
    });
    it('should increase the value of framePos', () => {
      app.scores = [8];
      let score = 1;
      app.framePos = 1;
      app.checkSpare(score);
      expect(app.framePos).toBe(2);
    });
  });

  describe('scoreCurrentRoll()', () => {

    it('should handle a strike', () => {
      app.scores = [];
      let score = 10;
      app.scoreCurrentRoll(score);
      expect(app.scores).toEqual([10,'X']);
    });

    it('should handle a spare', () => {
      app.scores = [];
      let score1 = 9;
      let score2 = 1;
      app.scoreCurrentRoll(score1);
      app.scoreCurrentRoll(score2);
      expect(app.scores).toEqual([9,'/']);
    });

    it('should handle a random game', () => {
      app.scores = [];
      app.scoreCurrentRoll(1);
      app.scoreCurrentRoll(1);
      app.scoreCurrentRoll(2);
      app.scoreCurrentRoll(2);
      app.scoreCurrentRoll(5);
      app.scoreCurrentRoll(5);
      app.scoreCurrentRoll(0);
      app.scoreCurrentRoll(2);
      app.scoreCurrentRoll(10);
      app.scoreCurrentRoll(10);
      app.scoreCurrentRoll(4);
      app.scoreCurrentRoll(5);
      app.scoreCurrentRoll(10);
      app.scoreCurrentRoll(1);
      app.scoreCurrentRoll(0);
      expect(app.scores).toEqual([1,1,2,2,5,'/',0,2,10,'X',10,'X',4,5,10,'X',1,0]);
    });

    it('should handle a perfect game', () => {
      app.scores = [];
      for (var r=0; r<12; r++) {
        app.scoreCurrentRoll(10);
      }
      expect(app.scores).toEqual([10,'X',10,'X',10,'X',10,'X',10,'X',10,'X',10,'X',10,'X',10,'X',10,10,10]);
    });

    it('should handle a perfectly bad game', () => {
      app.scores = [];
      for (var r=0; r<20; r++) {
        app.scoreCurrentRoll(0);
      }
      expect(app.scores).toEqual([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    });
  });

});
