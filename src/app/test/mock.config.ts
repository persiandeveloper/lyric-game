import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {MockQuizService} from "./mock";

export default {
    GET: {
        'http:///users': {
            handler: getQuestions
        }
    }
}

function getQuestions() {
    return of(new HttpResponse({ status: 200, body: MockQuizService.quiz

    }))
}