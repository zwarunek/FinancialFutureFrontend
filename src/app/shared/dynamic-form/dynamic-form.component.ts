import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren, EventEmitter,
  Input, Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {Footer, Header, MessageService, PrimeTemplate} from 'primeng/api';
import {AboveSubmit, Subtitle} from "@shared/api/shared.module";
import {QuestionBase} from "@shared/dynamic-form/dynamic-form-question/question-base";
import {FormGroup} from "@angular/forms";
import {
  QuestionControlService
} from "@shared/dynamic-form/dynamic-form-question/question-control.service";
import {Messages} from "primeng/messages";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dynamic-form.component.scss'],
  host: {
    'class': 'p-element'
  },
  providers: [QuestionControlService, MessageService]
})
export class DynamicFormComponent implements AfterContentInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  @Input() formOptions?: any;
  // @Input() onSubmitFunction!: Function;
  submitted: boolean = false;
  payLoad = '';
  @Output() onSubmitFunction: EventEmitter<any> = new EventEmitter();

  @Input() image!: string;

  @Input() header!: string;

  @Input() submitButtonText!: string;

  @Input() captcha: boolean = true;

  @Input() text!: string;

  @Input() subtitle!: string;

  @Input() aboveSubmit!: string;

  @Input() style: any;

  @Input() styleClass!: string;

  @ContentChild(Header) headerFacet: any;

  @ContentChild(Subtitle) subtitleFacet: any;

  @ContentChild(AboveSubmit) aboveSubmitFacet: any;

  @ContentChildren(PrimeTemplate) templates!: QueryList<any>;

  headerTemplate!: TemplateRef<any>;

  subtitleTemplate!: TemplateRef<any>;

  aboveSubmitTemplate!: TemplateRef<any>;

  contentTemplate!: TemplateRef<any>;

  footerTemplate!: TemplateRef<any>;

  constructor(private qcs: QuestionControlService) {
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'aboveSubmit':
          this.aboveSubmitTemplate = item.template;
          break;

        case 'subtitle':
          this.subtitleTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'footer':
          this.footerTemplate = item.template;
          break;

        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[], this.formOptions);
  }

  onSubmit() {
    this.submitted = true;
    // this.onSubmitFunction(this.form);
    this.onSubmitFunction.emit(this.form);
  }
}


