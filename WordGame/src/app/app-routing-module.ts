import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './features/authentication/pages/login/login';
import { Signup } from './features/authentication/pages/signup/signup';
import { Game } from './features/game/pages/game/game';
import { Scores } from './features/scores/pages/scores/scores';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'game', component: Game },
  { path: 'scores', component: Scores },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
