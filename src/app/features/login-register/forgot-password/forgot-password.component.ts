import { Component } from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "@app/app.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@core/services/user.service";
import {AuthenticationService} from "@core/services/authentication.service";
import {QuestionBase} from "@shared/dynamic-form/dynamic-form-question/question-base";
import {TextboxQuestion} from "@shared/dynamic-form/dynamic-form-question/question-textbox";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService]
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;
  success: any;
  rememberMe: boolean = false;
  sent: boolean = false;
  captchaVerified: any;
  questions: Observable<QuestionBase<any>[]>;
  msgs: Message[] = [];

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {

    this.questions = this.getQuestions();
    if (this.authService.getToken()) {
      this.router.navigate(['/']);
    }
    this.forgotPasswordForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)])
    });

  }

  onSubmit(form: FormGroup) {
    this.msgs = []
    this.submitted = true;
    this.error = null;
    this.success = null;

    if (form.invalid) {
      return;
    }
    this.app.loadingAdd();

    this.userService.sendPasswordResetTokenToEmail(form.value.username.toLowerCase())
    .subscribe((data: Response) => {
        if (data.status === 200) {
          this.sent = true;
        }
        this.app.loadingRemove();

      },
      (error: any) => {
        this.msgs = [{severity: 'error', summary: error}];
        this.app.loadingRemove();
      });
  }

  showResponse($event: any) {
    this.authService.reCaptchaValidation($event.response).subscribe((response: Response) => {
        // @ts-ignore
        if (response.status === 200 && response.body && response.body.success) {
          this.captchaVerified = true;
        } else {
          this.captchaVerified = false;
          this.msgs = [{severity: 'error', summary: 'An error occurred validating reCaptcha'}];
        }
        this.app.loadingRemove();

      })
  }
  getQuestions() {

    const questions: QuestionBase<string>[] = [

      new TextboxQuestion({
        key: 'username',
        label: 'Email',
        validators: [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)],
        order: 1
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
