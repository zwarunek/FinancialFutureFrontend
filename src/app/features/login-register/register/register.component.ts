import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "@app/app.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Message, MessageService} from "primeng/api";
import {UserService} from "@core/services/user.service";
import {AuthenticationService} from "@core/services/authentication.service";
import {QuestionBase} from "@shared/dynamic-form/dynamic-form-question/question-base";
import {TextboxQuestion} from "@shared/dynamic-form/dynamic-form-question/question-textbox";
import {Observable, of} from "rxjs";
import {passworrdQuestion} from "@shared/dynamic-form/dynamic-form-question/question-password";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;
  success: any;
  sent: boolean = false;
  questions: Observable<QuestionBase<any>[]>;
  msgs: Message[] = [];

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {

    this.questions = this.getQuestions();
    this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)]),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', Validators.required)
      // @ts-ignore
      }, this.passwordsShouldMatch);
  }
  passwordsShouldMatch(fGroup: FormGroup) {
    // @ts-ignore
    return fGroup.get('password').value === fGroup.get('confirmPassword').value
      ? null : {'mismatch': true};
  }

  onSubmit(form: FormGroup) {
    this.msgs = []
    this.submitted = true;
    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }
    this.app.loadingAdd();
    form.value.username = form.value.username.toLowerCase();
    form.value.firstName = form.value.firstName.toLowerCase();
    form.value.lastName = form.value.lastName.toLowerCase();
    delete form.value.confirmPassword;
    this.userService.register(form.value)
    .subscribe((data: any) => {
        if (data.status === 200) {
          if(data.data == 'Successful')
            this.sent = true;
          else
            this.msgs = [{severity: 'error', summary: 'An account already exists with that email'}];
        }
        this.app.loadingRemove();

      },
      (error: any) => {
        this.msgs = [{severity: 'error', summary: error}];
        this.app.loadingRemove();
      });
  }
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'username',
        label: 'Email',
        validators: [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)],
        order: 1
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First Name',
        validators: Validators.required,
        order: 2
      }),

      new TextboxQuestion({
        key: 'lastName',
        label: 'Last Name',
        validators: Validators.required,
        order: 3
      }),

      new passworrdQuestion({
        key: 'password',
        label: 'Password',
        validators: [Validators.required, Validators.minLength(6)],
        order: 4
      }),

      new passworrdQuestion({
        key: 'confirmPassword',
        label: 'Confirm Password',
        validators: Validators.required,
        order: 5
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
