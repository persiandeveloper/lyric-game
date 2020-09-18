import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';

@Component({
    selector: 'app-quiz-elements',
    templateUrl: './quizelement.component.html',
    //styleUrls: ['./quiz.component.css']
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [
            state('in', style({opacity: 1})),
            transition(':enter', [
              style({opacity: 0}),
              animate(300 )
            ]),
            transition(':leave',
              animate(600, style({opacity: 0})))
        ])
      ]
  })
  export class QuizElementComponent implements OnInit {

    @Input() qns;
    @Input() qnProgress;
    @Input() showNextQuetionButton;

    @Output() showNextQuestionEvent = new EventEmitter();
    @Output() answerEvent= new EventEmitter<number>();
 
    ngOnInit(): void {
       
    }
 
    Answer(event: number){
    
        this.answerEvent.emit(event);
    }

    showNextQuestion(){
      
        this.showNextQuestionEvent.emit();
    }

  }
  