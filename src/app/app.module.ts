import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './shared/quiz.service';
import { ReplaceQuestionHolder } from './pipe/textreplace';
import { QuizElementComponent } from './quizelement/quizelement.component';
import { ResultComponent } from './result/result.component';
import { MockModule } from './test/mock.module';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  { path: '', component: QuizComponent,pathMatch: 'full' },
  { path: 'GamePlay', component: QuizComponent,pathMatch: 'full' }
 
];


@NgModule({
  declarations: [
    AppComponent,
    ReplaceQuestionHolder,
    QuizComponent,
    QuizElementComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    [RouterModule.forRoot(routes)]
  ],
  providers: [QuizService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
