import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "@app/app.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Message, MessageService} from "primeng/api";
import {UserService} from "@core/services/user.service";
import {AuthenticationService} from "@core/services/authentication.service";
import {Observable, of} from "rxjs";
import {QuestionBase} from "@shared/dynamic-form/dynamic-form-question/question-base";
import {passworrdQuestion} from "@shared/dynamic-form/dynamic-form-question/question-password";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [MessageService]
})
export class PasswordResetComponent implements OnInit {

  resetPasswordForm: FormGroup;
  submitted = false;
  error: any;
  success: any;
  changed: boolean = false;
  expired: boolean = false;
  token: string | null;
  accountDetails: any;
  sent: boolean = false;
  showError: boolean = false;
  captchaVerified: any;
  questions: Observable<QuestionBase<any>[]>;
  msgs: Message[] = [];

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {
    this.questions = this.getQuestions();
    if (this.authService.getToken()) {
      this.router.navigate(['/']);
    }

    this.token = this.route.snapshot.queryParamMap.get('token');
    this.resetPasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
      // @ts-ignore
    }, this.passwordsShouldMatch);
  }

  passwordsShouldMatch(fGroup: FormGroup) {
    // @ts-ignore
    return fGroup.get('password').value === fGroup.get('confirmPassword').value
      ? null : {'mismatch': true};
  }

  ngOnInit(): void {
    if (this.token) {
      this.userService.getAccountDetailsFromPasswordResetToken(this.token).subscribe((response: any) => {
          // @ts-ignore
          console.log(response);
          if (response.status === 200 && response.body && response.body.data) {
            if (response.body.data === 'Invalid Token') {
              this.showError = true;
            }
            else if (response.body.data === 'Expired Token') {
              this.expired = true;
              this.accountDetails = response.body.account;
            }
            else if (response.body.data === 'Successful') {
              this.accountDetails = response.body.account;
            }
          } else {
            this.showError = true;
          }
          this.app.loadingRemove();

        },
        (error: any) => {
          this.showError = true;
          this.app.loadingRemove();
        });
    } else {
      this.showError = true;
    }
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
    if (this.token == null) {
      this.showError = true
    } else {
      this.userService.resetPassword(form.value.password, this.token)
      .subscribe((data: any) => {
          if (data.status === 200 && data.body.data) {
            if (data.body.data === 'Invalid Token') {
              this.showError = true;
            }
            if (data.body.data === 'Successful') {
              this.changed = true;
            }
            if (data.body.data === 'Expired Token') {
              this.expired = true;
            }
          } else {
            this.showError = true;
          }
          this.app.loadingRemove();

        },
        (error: any) => {
          this.showError = true;
          this.app.loadingRemove();
        });
    }
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

  resendLink() {
    this.app.loadingAdd();
    this.userService.sendPasswordResetTokenToEmail(this.accountDetails.username)
    .subscribe((data: Response) => {
        if (data.status === 200) {
          this.sent = true;
        } else {
          this.showError = true;
        }
        this.app.loadingRemove();

      },
      (error: any) => {
        this.showError = true;
        this.app.loadingRemove();
      });
  }
  getQuestions() {

    const questions: QuestionBase<string>[] = [
      new passworrdQuestion({
        key: 'password',
        label: 'Password',
        validators: [Validators.required, Validators.minLength(6)],
        order: 1
      }),

      new passworrdQuestion({
        key: 'confirmPassword',
        label: 'Confirm Password',
        validators: Validators.required,
        order: 2
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
