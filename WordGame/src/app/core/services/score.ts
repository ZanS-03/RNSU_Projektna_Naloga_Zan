import { Injectable } from '@angular/core';

export interface ScoreState {
  successful: number;
  skipped: number;
}

const KEY = 'wordgame_scores';

@Injectable({ providedIn: 'root' })
export class ScoreService {
  public get(): ScoreState {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { successful: 0, skipped: 0 };

    try {
      const parsed = JSON.parse(raw) as ScoreState;
      return {
        successful: Number(parsed.successful) || 0,
        skipped: Number(parsed.skipped) || 0,
      };
    } catch {
      return { successful: 0, skipped: 0 };
    }
  }

  public set(state: ScoreState): void {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  public reset(): void {
    localStorage.removeItem(KEY);
  }

  public incSuccessful(): ScoreState {
    const s = this.get();
    const next = { successful: s.successful + 1, skipped: s.skipped };
    this.set(next);
    return next;
  }

  public incSkipped(): ScoreState {
    const s = this.get();
    const next = { successful: s.successful, skipped: s.skipped + 1 };
    this.set(next);
    return next;
  }
}