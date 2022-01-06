import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './question-base';

@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;
  @Input() submitted!: boolean;
  @Output() onSubmitFunction: EventEmitter<any> = new EventEmitter();
  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  getMinLength(key: string): string {
    try { // @ts-ignore
      return this.form.controls[key].errors['minlength']['requiredLength']}
    catch (e: any){
      return " "
    }
  }
  submit(){
    this.onSubmitFunction.emit();
  }
}
