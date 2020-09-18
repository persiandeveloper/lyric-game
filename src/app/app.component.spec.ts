import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizElementComponent } from './quizelement/quizelement.component';
import { ResultComponent } from './result/result.component';
import { ReplaceQuestionHolder } from './pipe/textreplace';
import { QuizService } from './shared/quiz.service';
import { RouterModule } from '@angular/router';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        QuizComponent,
        QuizElementComponent,
        ResultComponent,
        ReplaceQuestionHolder
      ],
      providers: [
        { provide: QuizService}
      ],
      imports: [ 
        RouterModule.forRoot([]),
        
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
