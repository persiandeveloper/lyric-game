import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
  })
  export class ResultComponent implements OnInit {

    @Input() correctAnswers:number;
    @Input() failedAnswers:number;
    @Input() finished:boolean;
    @Input() highScore:number;
    @Input() nextLevel:boolean;
    @Input() distanceToBestScore:number;

    @Output() startAnotherRoundEvent= new EventEmitter();
    @Output() restartEvent= new EventEmitter();

    ngOnInit(): void {
        
    }

    startAnotherRound(){
        this.startAnotherRoundEvent.emit();
    }

    restart(){
      this.restartEvent.emit();
    }

    get scoredAll(): boolean{
        return this.distanceToBestScore < 0 ;
    }

    get canRestart(): boolean{
      return this.finished && !this.nextLevel;
    }
   
  }