import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, UserService} from "../_services";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
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

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {

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

  get f() {
    return this.resetPasswordForm.controls;
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
            this.error = response.body;
            this.show();
          }
          this.app.loadingRemove();

        },
        (error: any) => {
          console.log(error);
          this.showError = true;
          this.error = error;
          this.show();
          this.app.loadingRemove();
        });
    } else {
      this.showError = true;
    }
  }

  onSubmitPassword() {
    this.submitted = true;

    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.app.loadingAdd();
    if (this.token == null) {
      this.showError = true
    } else {
      this.userService.resetPassword(this.f['password'].value, this.token)
      .subscribe((data: any) => {
          console.log(data);
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
  }

  show() {
    this.messageService.add({severity: 'error', detail: this.error});
  }

  showResponse($event: any) {
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

    })
  }

  resendLink() {
    this.app.loadingAdd();
    this.userService.sendPasswordResetTokenToEmail(this.accountDetails.username)
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
}
