import { Injectable } from '@angular/core';

export interface AppUser {

  email: string;
  password: string;

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly tokenKey = 'authToken'; //baza klučov
  private readonly usersKey = 'users'; //baza uporabnikov

  private getUsers(): AppUser[] {

    const raw = localStorage.getItem(this.usersKey);

    if (!raw) return [];

    try {

      const parsed = JSON.parse(raw) as AppUser[];
      
      return Array.isArray(parsed)
        ? parsed.filter(u => !!u?.email && !!u?.password):[];

    } catch {

      return [];

    }

  }

  private setUsers(users: AppUser[]): void {

    localStorage.setItem(this.usersKey, JSON.stringify(users));

  }

  public userExists(email: string): boolean {

    const users = this.getUsers();

    return users.some(u => u.email.toLowerCase() === email.toLowerCase());

  }

  public signup(email: string, password: string): { ok: boolean; message: string } {

    email = (email ?? '').trim().toLowerCase();

    password = (password ?? '').trim();

    if (!email || !password){

      return { ok: false, message: 'Email and password are required.' };

    }

    const users = this.getUsers();

    const exists = users.some(u => u.email === email);

    if (exists) {

      return { ok: false, message: 'User with this email already exists.' };

    }

    users.push({ email, password });
    this.setUsers(users);

    return { ok: true, message: 'Account created. You can now log in.' };



  }

  public login(email: string, password: string): { ok: boolean; message: string } {

    email = (email ?? '').trim().toLowerCase();

    password = (password ?? '').trim();

    if (!email || !password) {

      return { ok: false, message: 'Email and password are required.' };
    }

    const users = this.getUsers();
    const match = users.find(u => u.email === email && u.password === password);

    if (!match) {

      return { ok: false, message: 'Invalid email or password.' };

    }

    const fakeToken = 'FAKE-JWT-' + new Date().getTime();

    localStorage.setItem(this.tokenKey, fakeToken);

    return { ok: true, message: 'Logged in.' };

  }

  public logout(): void {

    localStorage.removeItem(this.tokenKey);

  }

  public getToken(): string | null {

    return localStorage.getItem(this.tokenKey);

  }

  public isLoggedIn(): boolean {

    return this.getToken() !== null;


  }

  
}

