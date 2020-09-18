import { Quiz, QuizItemModel, Option } from '../shared/quizItemModel';
import { Observable, of } from 'rxjs';

 export class MockQuizService {

    public static quiz: Quiz = {
        FullName: "a", HighScore: 10, TopScore: 190,
        questions: [{
            Qn: "1 Test Test Test (-----)",
            QnID: 1,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "2 Test Test Test (-----)",
            QnID: 2,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: false,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: false,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: false,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "3 Test Test Test (-----)",
            QnID: 3,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: false,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: false,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "4 Test Test Test (-----)",
            QnID: 4,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                }
                ,
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: false,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "Test Test Test (-----)",
            QnID: 5,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "Test Test Test (-----)",
            QnID: 6,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "Test Test Test (-----)",
            QnID: 7,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
            ]
        },
        {
            Qn: "Test Test Test (-----)",
            QnID: 8,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "Test Test Test (-----)",
            QnID: 9,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                }
            ]
        },
        {
            Qn: "Test Test Test (-----)",
            QnID: 10,
            Singer: "",
            Options: [
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: true,
                    Option: "X"
                },
                {
                    ChangeColor: false,
                    FailColor: false,
                    IsAnswer: false,
                    Option: "X"
                }
            ]
        }
    ]
    };
}