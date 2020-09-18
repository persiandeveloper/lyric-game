import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizComponent } from './quiz.component';
import { QuizElementComponent } from '../quizelement/quizelement.component';
import { ResultComponent } from '../result/result.component';
import { ReplaceQuestionHolder } from '../pipe/textreplace';
import { QuizService } from '../shared/quiz.service';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockQuizService } from '../test/mock';
import { of } from 'rxjs';


describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  let debuglement: DebugElement;

  //spyOn(quizSerice, 'getQuestions').and.returnValue(of(MockQuizService.quiz));

  //let quizSpySerice = jasmine.createSpyObj('QuizService', ['getQuestions']);
  //quizSpySerice.getQuestions.and.returnValue(of(MockQuizService.quiz));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizComponent,
        QuizElementComponent,
        ResultComponent,
        ReplaceQuestionHolder
      ],
      providers: [

        QuizService,
        {
          provide: ActivatedRoute, useValue: {
            queryParams: of({ id: 'test' })
          }
        }
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {



    fixture = TestBed.createComponent(QuizComponent);

    component = fixture.componentInstance;
    debuglement = fixture.debugElement;

    spyOn(component.quizService, 'getQuestions').and.returnValue(of(MockQuizService.quiz));
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('quiz button cliclable', () => {
    expect(debuglement.nativeElement.querySelector('#startGameBtn').disabled).toBeFalsy();
  });

  it('should show quiz after clicking', () => {
    debuglement.nativeElement.querySelector('#startGameBtn').click();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.started).toBeTruthy();

      expect(debuglement.nativeElement.querySelector('#headerPart')).toBeFalsy();

    });
  });

  it('answer - one fail - go to end', () => {

    debuglement.nativeElement.querySelector('#startGameBtn').click();

    fixture.detectChanges();
    component.Answer(1);
    fixture.detectChanges();
    expect(component.progress).toBe(1);

    component.Answer(1);
    fixture.detectChanges();
    expect(component.showNextQuetionButton).toBe(true);

    component.showNextQuestion();
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    expect(component.nextLevel).toBe(true);

  });

  it('answer - two fail - go to end - ', () => {

    debuglement.nativeElement.querySelector('#startGameBtn').click();

    fixture.detectChanges();
    component.Answer(1);
    fixture.detectChanges();
    expect(component.progress).toBe(1);

    component.Answer(1);
    fixture.detectChanges();
    expect(component.showNextQuetionButton).toBe(true);

    component.showNextQuestion();
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(1);
    fixture.detectChanges();

    component.Answer(3);
    fixture.detectChanges();

    component.showNextQuestion();
    fixture.detectChanges();

    expect(component.nextLevel).toBe(false);

  });

  it('answer - loop to 140 - two fail - go to end - ', () => {

    debuglement.nativeElement.querySelector('#startGameBtn').click();

    fixture.detectChanges();

   
      

    for(var counter:number = 0; counter<146; counter++){
      

      if(component.finsihed && !component.nextLevel){
        break;
      }

      if(component.progress==1 && (counter!=118 && counter!=128))
      {
        component.Answer(0);
        fixture.detectChanges();
      }
      if(component.progress==1 && (counter==118 || counter==128)){
        component.Answer(1);
        fixture.detectChanges();

        
        if(component.showNextQuestion){
          component.showNextQuestion();
          fixture.detectChanges();
        }
       
      }
      else{
       
        component.Answer(1);
        fixture.detectChanges();
      }
      


      if(component.nextLevel){
       
        component.startAnotherRound();
        fixture.detectChanges();

        component.nextLevel=false;
        fixture.detectChanges();
      }

    }

  })

  it('answer - loop to 140 - two fails - go to end - not show next ', () => {

    debuglement.nativeElement.querySelector('#startGameBtn').click();

    fixture.detectChanges();

    for(var counter:number = 0; counter<146; counter++){
      
     
      if(component.finsihed && !component.nextLevel){
        break;
      }

      if(component.progress==1 && (counter!=137 && counter!=118 && counter!=128))
      {
        component.Answer(0);
        fixture.detectChanges();
      }
      if(component.progress==1 && (counter==137 || counter==118 || counter==128)){
        component.Answer(1);
        fixture.detectChanges();

        
        if(component.showNextQuestion){
          component.showNextQuestion();
          fixture.detectChanges();
        }
       
      }
      else{
       
        component.Answer(1);
        fixture.detectChanges();
      }
      
      if(component.failedAnswers==3){
        expect(component.nextLevel).toBeFalsy();
      }


      if(component.nextLevel){
       
        component.startAnotherRound();
        fixture.detectChanges();

        //component.nextLevel=false;
        //fixture.detectChanges();
      }

    }

  })

  it('answer - three fail', async(() => {

    debuglement.nativeElement.querySelector('#startGameBtn').click();

    fixture.detectChanges();
    component.Answer(1); //1
    fixture.detectChanges();
    expect(component.progress).toBe(1);

    component.Answer(1); //2
    fixture.detectChanges();
    expect(component.showNextQuetionButton).toBe(true);

    component.showNextQuestion();
    fixture.detectChanges();

    component.Answer(3); //3
    fixture.detectChanges();

    component.showNextQuestion();
    fixture.detectChanges();

    component.Answer(3); //4
    fixture.detectChanges();

    component.showNextQuestion();
    fixture.detectChanges();


    expect(component.finsihed).toBe(true);

    //var spoyon = spyOn(component.quizService,"submitScore");

    //debugger;
    //expect(spoyon).toHaveBeenCalled();

  }));

});
