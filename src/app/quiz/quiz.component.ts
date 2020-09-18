import { Component, OnInit, Input, Inject } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { timer, Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { takeUntil, repeatWhen } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Quiz } from '../shared/quizItemModel';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  finsihed: boolean;
  started: boolean;

  enableStart = false;
  lastHighScore: number;

  scored: boolean;

  nextLevel: boolean;

  showNextQuetionButton: boolean = false;
  singers: string[];
  fullName: string;
  bestScore: number;

  
  observeFail$ = new BehaviorSubject(0);
  //observeFail_onNext$ = new BehaviorSubject(true);


  constructor(public quizService: QuizService, private route: ActivatedRoute, @Inject(DOCUMENT) document) { }

  userid: string;

  subscribeTimer: any;
  timeLeft: number = environment.gameTime;
  source: Observable<any>;
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  activeQuestions = 0;


  ngOnInit() {

    this.clearCurrentUserGameStatus();

    /*this.observeFail_onNext$.subscribe(t => {

      if (this.failedAnswers == 3 && t == false) {
        debugger;
        this.finsihed = true;
        this.nextLevel = false;

        this.quizService.submitScore(this.userid).subscribe(_ => _);
        this.stopNavifationAndTimer();
      }
    });*/

    this.observeFail$.subscribe(t => {

      if (t == 3 && this.showNextQuetionButton == false) {
        this.finsihed = true;
        this.nextLevel = false;

        this.quizService.submitScore(this.userid).subscribe(_ => _);
        this.stopNavifationAndTimer();
      }
      if (t == 2) {
        this.nextLevel = false;
      }
    });

    this.route.queryParams
      .subscribe(params => {
        //console.log(params); // {order: "popular"}

        if (environment.production) {
          if (document.getElementsByName("__RequestVerificationToken")[0]) {
            this.quizService.token = document.getElementsByName("__RequestVerificationToken")[0].getAttribute("value");
          }
        }
        else {
          this.quizService.token = "test";
        }



        this.userid = params.id;
        if (this.userid && this.quizService.token) {
          this.enableStart = true;
          //this.finsihed = true;
          this.initQuestions(null);

        }
      });
  }

  initQuestions(action: () => void) {
    this.quizService.getQuestions(this.userid).subscribe(
      (data: Quiz) => {
        this.quizService.qns = data.questions;

        this.quizService.currentRoundResponses = 0;

        this.quizService.qnProgress = 0;
        this.quizService.lastHighScore = data.HighScore;
        this.activeQuestions = this.quizService.qns.length;
        this.fullName = data.FullName;
        this.bestScore = data.TopScore;

        const unique = (value, index, self) => {
          return self.indexOf(value) === index
        }

        this.singers = data.questions.map(r => r.Singer).filter(unique);

        if (action) {
          action();
        }
      }
    );
  }

  failCondition() {
    this.quizService.fail++;
    this.observeFail$.next(this.quizService.fail);

  }

  startTimer() {
    this.source = timer(1000, 2000);

    this.source
      .pipe(
        takeUntil(this._stop),
        repeatWhen(() => this._start)
      ).subscribe(val => {
        this.subscribeTimer = this.timeLeft - val;
        if (this.subscribeTimer == 0 && !this.finsihed) {
          this.nextQuestion();
        }
      });
  }


  nextQuestion() {
    this.showNextQuetionButton = false;

    //this.observeFail_onNext$.next(this.showNextQuetionButton);

    this.quizService.qnProgress++;

    if (this.quizService.currentRoundResponses != this.quizService.qnProgress) {
      this.failCondition();
    }

    if (this.quizService.fishiedAllQuestions()) {
      this.finsihed = true;
    }
    this._stop.next();
    this.resetLeftTime();
    this._start.next();

  }

  Answer(choice: number) {
    //this.quizService.qns[this.quizService.qnProgress].answer = choice;
    //localStorage.setItem('qns', JSON.stringify(this.quizService.qns));

    this.quizService.currentRoundResponses++;


    var currentOptions = this.quizService.qns[this.quizService.qnProgress].Options;

    if (currentOptions[choice].IsAnswer) {
      this.quizService.correct++;

      this.showNextQuestion();
    }
    else {

      this.showNextQuetionButton = true;

      //this.observeFail_onNext$.next(this.showNextQuetionButton);

      this.failCondition();

      currentOptions[choice].FailColor = true;
      var correctOption = currentOptions.find(r => r.IsAnswer);
      correctOption.ChangeColor = true;
    }
  }

  showNextQuestion() {

    this.showNextQuetionButton = false;

    //this.observeFail_onNext$.next(this.showNextQuetionButton);

    if (this.quizService.fail == 3) {
      this.quizService.submitScore(this.userid).subscribe(_ => _);
      this.stopNavifationAndTimer();
      return;
    }

    this.quizService.qnProgress++;


    if (this.quizService.fishiedAllQuestions()) {

      this.stopNavifationAndTimer();
      this.scored = this.quizService.scored();
      this.quizService.submitScore(this.userid).subscribe(_ => _);

      if (this.quizService.answeredAllCorrectly()) {
        this.nextLevel = true;
      } else {
        this.nextLevel = false;
      }
      return;
    }



    this._stop.next();

    this.resetLeftTime();

    this._start.next();


  }

  startAnotherRound() {
    this.finsihed = false;
    this.initQuestions(() => this.start());
  }

  private stopNavifationAndTimer() {
    this._stop.next();
    this.finsihed = true;
  }

  restartGame(){
   
    this.quizService.reset();

    this.initQuestions(() => this.startAndRestControllingValues());
  }

  resetLeftTime() {
    if (this.quizService.correct >= 30) {
      this.timeLeft = 10;
    }
    this.timeLeft = environment.gameTime;
  }

  start(): void {
    this.started = true;
    this.startTimer();
  }

  startAndRestControllingValues(){
    this.started = true;
    this.finsihed=false;
    this.startTimer();
  }

  private clearCurrentUserGameStatus() {
    this.quizService.qnProgress = 0;
  }

  get distanceToBestScore() {

    return this.bestScore - this.quizService.correct;
  }


  get questions() {
    return this.quizService.qns;
  }

  get progress() {
    return this.quizService.qnProgress;
  }

  get showsingers(): string[] {
    return this.singers;
  }

  get correctAnswers(): number {
    return this.quizService.correct;
  }

  get failedAnswers(): number {
    return this.quizService.fail;
  }

  get highScore(): number {
    return this.quizService.lastHighScore;
  }
}
