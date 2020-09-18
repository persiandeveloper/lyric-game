import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Quiz, QuizItemModel } from './quizItemModel';

@Injectable()
export class QuizService {


  //---------------- Properties---------------
  readonly rootUrl = environment.url;
  qns: QuizItemModel[];
  seconds: number;
  timer;
  qnProgress: number;
  correct: number = 0;
  fail: number = 0;
  lastHighScore: number;
  token: string;
  currentRoundResponses: number;

  currentRoundNumber = 0;

  //---------------- Helper Methods---------------
  constructor(private http: HttpClient) {

  }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  getParticipantName() {
    var participant = JSON.parse(localStorage.getItem('participant'));
    return participant.Name;
  }

  scored(): boolean {
    return this.lastHighScore < this.correct;
  }

  //---------------- Http Methods---------------

  insertParticipant(name: string, email: string) {
    var body = {
      Name: name,
      Email: email
    }
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  getQuestions(queryid: string): Observable<Quiz> {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-XSRF-Token': this.token
      })
    };
    this.currentRoundNumber++;
    return this.http.get<Quiz>(

      this.rootUrl + '/game/Questions?queryid=' + queryid + "&r="+this.currentRoundNumber

      , httpOptions).
      pipe(
        retry(5));;
  }

  reset(){
    this.correct=0;
    this.fail=0;
    this.currentRoundNumber=0;
    this.qnProgress=0;
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnID);
    return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore(q) {
    var score = this.correct;
    const httpOptions = {
      headers: new HttpHeaders({
        'X-XSRF-Token': this.token
      })
    };
    return this.http.post(this.rootUrl + "/game/setscore",
      { queryid: q, score: score }, httpOptions).pipe(retry(5));;
  }

  fishiedAllQuestions() {

    return this.qnProgress == this.qns.length || (this.fail == 3);
  }

  answeredAllCorrectly() {
    return this.fail < 2;
  }
}
