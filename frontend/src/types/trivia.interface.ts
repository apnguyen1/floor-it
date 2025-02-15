export interface TriviaQuestion {
  question: string;
  answers: string[];
  aliases: string[];
}

export interface TriviaInterface {
  name: string;
  preview_img: string;
  preview_desc: string;
  type: string;
  questions: TriviaQuestion[];
}
