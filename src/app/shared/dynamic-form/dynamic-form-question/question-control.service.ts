import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {QuestionBase} from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() {
  }

  toFormGroup(questions: QuestionBase<string>[], options: any) {
    const group: any = {};
    questions.forEach(question => {
      group[question.key] =  new FormControl(question.value || '', question.validators);
    });
    return new FormGroup(group, options);
  }
}
