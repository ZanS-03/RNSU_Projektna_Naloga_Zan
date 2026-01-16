import { Component, ChangeDetectorRef } from '@angular/core';
import { WordService } from '../../../../core/services/word';
import { ScoreService } from '../../../../core/services/score';

@Component({

  selector: 'app-game',
  standalone: false,
  templateUrl: './game.html',
  styleUrl: './game.css',

})

export class Game {

  public originalWord: string = '';
  public scrambledWord: string = '';
  public userGuess: string = '';
  public feedback: string = 'Click "New word" to start.';

  public sessionSuccessful: number = 0;
  public sessionSkipped: number = 0;

  private hasActiveWord: boolean = false;

  public constructor(
    private wordService: WordService,
    private cdr: ChangeDetectorRef,
    private scoreService: ScoreService
  ) {}

  public newWord(): void {
    
    if (this.hasActiveWord) {
      this.sessionSkipped++;
      const s = this.scoreService.incSkipped();

    }

    this.wordService.getRandomWord().subscribe((word) => {
      this.originalWord = word.trim().toLowerCase();
      this.scrambledWord = this.scramble(this.originalWord);
      this.userGuess = '';
      this.feedback = 'Type your answer and click Confirm.';
      this.hasActiveWord = true;

      this.cdr.detectChanges();
    });
  }

  public confirm(): void {
    const guess = this.userGuess.trim().toLowerCase();

    if (!this.hasActiveWord) {
      this.feedback = 'Click "New word" to start.';
      return;
    }

    if (!guess) {
      this.feedback = 'Please enter a guess.';
      return;
    }

    if (guess === this.originalWord) {
      this.sessionSuccessful++;
      const s = this.scoreService.incSuccessful();

      this.feedback = '✅ Correct! Click "New word" for the next word.';
      this.hasActiveWord = false; // igra končana
    } else {
      this.feedback = '❌ Wrong. Try again.';
    }
  }

  private scramble(word: string): string {

    const arr = word.split('');

    for (let i = arr.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];

    }

    const mixed = arr.join('');

    if (mixed === word && word.length > 1) return this.scramble(word);
    
    return mixed;

  }
}
