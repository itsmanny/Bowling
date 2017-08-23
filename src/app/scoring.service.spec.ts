import { TestBed, inject } from '@angular/core/testing';

import { ScoringService } from './scoring.service';

describe('ScoringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoringService]
    });
  });

  it('should be created', inject([ScoringService], (service: ScoringService) => {
    expect(service).toBeTruthy();
  }));

  it('should handle the strike bonus', inject([ScoringService], (service: ScoringService) => {
    let score = 0;
    let rolls = [10,5,4];
    score = service.calc(rolls, 2);
    expect(score).toBe(28);
  }));

  it('should handle the spare bonus', inject([ScoringService], (service: ScoringService) => {
    let score = 0;
    let rolls = [9,1,5,0];
    score = service.calc(rolls,2);
    expect(score).toBe(20);
  }));

  it('should handle a strike-free and spare-free game', inject([ScoringService], (service: ScoringService) => {
    let score = 0;
    let rolls = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    score = service.calc(rolls, 10);
    expect(score).toBe(20);
  }));

  it('should handle a perfect game', inject([ScoringService], (service: ScoringService) => {
    let score = 0;
    let rolls = [10,10,10,10,10,10,10,10,10,10,10,10];
    score = service.calc(rolls, 10);
    expect(score).toBe(300);
  }));

  it('should handle a perfectly bad game', inject([ScoringService], (service: ScoringService) => {
    let score = 0;
    let rolls = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    score = service.calc(rolls, 10);
    expect(score).toBe(0);
  }));

});
