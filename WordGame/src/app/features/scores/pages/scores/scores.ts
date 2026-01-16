import { Component } from '@angular/core';
import { ScoreService, ScoreState } from '../../../../core/services/score';

@Component({

  selector: 'app-scores',
  standalone: false,
  templateUrl: './scores.html',
  styleUrl: './scores.css',

})

export class Scores {

  public state: ScoreState = { successful: 0, skipped: 0 };

  constructor(private scoreService: ScoreService) {

    this.load();

  }

  public load(): void {

    this.state = this.scoreService.get();

  }

  public reset(): void {

    this.scoreService.reset();
    this.load();

  }

  public totalGames(): number {

    return this.state.successful + this.state.skipped;

  }

  public accuracy(): number {

    const total = this.totalGames();
    if (total === 0) return 0;
    return Math.round((this.state.successful / total) * 100);
  }

}


