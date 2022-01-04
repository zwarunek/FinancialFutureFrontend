import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, UserService} from "../_services";
import {MustMatch} from "../_helpers";
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [MessageService]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;
  success: any;
  rememberMe: boolean = false;
  sent: boolean = false;
  captchaVerified: any;

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {
    if (this.authService.getToken()) {
      this.router.navigate(['/']);
    }
    this.forgotPasswordForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)])
    });

  }
  ngOnInit(): void {
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmitPassword() {
    this.submitted = true;

    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.app.loadingAdd();

    this.userService.sendPasswordResetTokenToEmail(this.f['username'].value)
    .subscribe((data: Response) => {
        if (data.status === 200) {
          this.sent = true;
        } else {
          this.error = data.status.toString();
          this.show();
        }
        this.app.loadingRemove();

      },
      (error: any) => {
        this.error = error;
        this.show();
        this.app.loadingRemove();
      });
  }

  show() {
    this.messageService.add({severity: 'error', detail: this.error});
  }

  showResponse($event: any) {
    console.log($event);
    this.authService.reCaptchaValidation($event.response).subscribe((response: Response) => {
        // @ts-ignore
        if (response.status === 200 && response.body && response.body.success) {
          this.captchaVerified = true;
        } else {
          this.captchaVerified = false;
          this.error = "An error occurred validating reCaptcha";
          this.show();
        }
        this.app.loadingRemove();

      },
      (error: any) => {
        this.error = error;
        this.show();
        this.app.loadingRemove();
      });
  }
}
