import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';
import { GameComponent } from './game/game.component';
import { RegisterComponent } from './start/register/register.component';
import { LoginComponent } from './start/login/login.component';
import { QuestionsComponent } from './fragenkatalog/questions.component' ;
import { CategoryComponent } from './game/category/category.component';
import { EditQuestionsComponent } from './fragenkatalog/edit-questions/edit-questions.component';
import { AuthGuard } from './../services/authGuard.service';
import { ScoreComponent } from './home/score/score.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'start', component: StartComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'game/:category', component: GameComponent, canActivate: [AuthGuard]},
  {path: 'fragenkatalog', component: QuestionsComponent, canActivate: [AuthGuard]},
  {path: 'fragenbearbeiten/:category', component: EditQuestionsComponent, canActivate: [AuthGuard]},
  {path: 'auswahl', component: CategoryComponent, canActivate: [AuthGuard]},
  {path: 'score', component: ScoreComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
