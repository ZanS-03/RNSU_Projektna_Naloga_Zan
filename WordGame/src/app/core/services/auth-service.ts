import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' //globalen
})
export class AuthService {

  private readonly tokenKey: string = 'authToken'; //ime ključa za shranjevanje tokena

  public login(email: string, password: string): boolean {
    if (!email || !password) {
      return false; //če sta email ali password prazna, login ne uspe
    }

    const fakeToken = 'FAKE-JWT-' + new Date().getTime(); //struktura tokena
    localStorage.setItem(this.tokenKey, fakeToken); //token shranimo v localStorage - v brskalniku

    return true;
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey); //ko se uporabnik odjavi se token odstrani
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey); //vrne string: token, če ga ni potem vrne null
  }

  public isLoggedIn(): boolean {
    return this.getToken() !== null; //vrne če token obstaja - za preverjanje prijave ob klikih v navbar
  }
}
