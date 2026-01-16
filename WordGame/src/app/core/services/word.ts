import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({

  providedIn: 'root'


})

export class WordService {

  public constructor(private http: HttpClient) {}

public getRandomWord(): Observable<string> {
  
    return this.http
      .get<string[]>('https://random-word-api.vercel.app/api?words=1')
      .pipe(
        map(words => words[0].toLowerCase())
      );

      
  }

}



