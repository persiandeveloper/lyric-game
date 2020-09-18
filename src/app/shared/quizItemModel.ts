export interface Quiz{
    questions : QuizItemModel[];
    HighScore: number;
    FullName: string;
    TopScore: number;
}

export interface QuizItemModel {
    QnID: number;
    Qn: string;
    Options :  Option[];
    Singer: string;
    MusicName?:string;
    Poet?: string;
}

export interface Option{
    Option: string;
    IsAnswer: boolean;
    ChangeColor: boolean;
    FailColor: boolean;
}