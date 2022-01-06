import { QuestionBase } from './question-base';

export class passworrdQuestion extends QuestionBase<string> {
  override controlType = 'password';
}
