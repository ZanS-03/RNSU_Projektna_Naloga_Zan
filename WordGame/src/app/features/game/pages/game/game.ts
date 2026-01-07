import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {

  public constructor(private http: HttpClient) {

    this.http.get('https://random-word-api.herokuapp.com/word?number=1')
      .subscribe({
        next: (res) => console.log('API OK:', res),
        error: (err) => console.log('API ERROR:', err)
      });

  }
}