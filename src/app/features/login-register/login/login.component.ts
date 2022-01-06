import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Message, MessageService} from "primeng/api";
import {AppComponent} from "@app/app.component";
import {AuthenticationService} from "@core/services/authentication.service";
import {QuestionBase} from "@shared/dynamic-form/dynamic-form-question/question-base";
import {TextboxQuestion} from "@shared/dynamic-form/dynamic-form-question/question-textbox";
import {passworrdQuestion} from "@shared/dynamic-form/dynamic-form-question/question-password";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: any;
  success: any;
  rememberMe: boolean = false;
  notEnabled: boolean = false;
  questions: Observable<QuestionBase<any>[]>;
  msgs: Message[] = [];

  constructor(private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {
    this.questions = this.getQuestions();
    if (this.authService.getToken()) {
      this.router.navigate(['/']);
    }
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.route.snapshot.queryParams['registered']) {
      this.success = 'Registration successful';
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    this.msgs = []
    this.submitted = true;
    this.notEnabled = false;
    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (form.invalid) {

      return;
    }
    this.app.loadingAdd();
    let username = form.value.username.toLowerCase();
    this.authService.login(username, form.value.password)
    .subscribe((response: any) => {
        let token = response.headers.get("Authorization")
        if (response.status === 200) {
          if(token){
            this.authService.saveToken(token, this.rememberMe)
            this.authService.saveUser(response.body, this.rememberMe)
            this.router.navigate([this.returnUrl])
            // .then(() => {
            //   window.location.reload();
            // });
          }
          else{
            this.msgs = [{severity: 'error', summary: 'Username and Password do not match'}];
          }
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
        validators: Validators.required,
        order: 1
      }),

      new passworrdQuestion({
        key: 'password',
        label: 'Password',
        validators: Validators.required,
        order: 2
      })
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
