import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, UserService} from "../_services";
import {MessageService} from "primeng/api";
import {MustMatch} from "../_helpers";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
  providers: [MessageService]
})
export class PasswordResetComponent implements OnInit {

  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;
  success: any;
  rememberMe: boolean = false;
  changed: boolean = false;
  token: string | null;
  accountDetails: any;
  showError: boolean = false;

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {

    if (this.authService.getToken()) {
      this.router.navigate(['/']);
    }
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.resetPasswordForm = new FormGroup({
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
      },
      {
        // @ts-ignore
        validator: MustMatch('newPassword', 'confirmPassword')
      });

  }

  get f() {
    return this.resetPasswordForm.controls;
  }

  ngOnInit(): void {
    if (this.token) {
      this.userService.getAccountDetailsFromPasswordResetToken(this.token).subscribe((response: Response) => {
          // @ts-ignore
          if (response.status === 200 && response.body) {
            this.accountDetails = response.body;
          } else {
            this.showError = true;
            this.error = "An Error has occurred";
            this.show();
          }
          this.app.loadingRemove();

        },
        (error: any) => {
          this.showError = true;
          this.error = error;
          this.show();
          this.app.loadingRemove();
        });
    }
    else{
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
    if(this.token == null){
      this.showError = true
    }
    else {
      this.userService.resetPassword(this.f['password'].value, this.token)
      .subscribe((data: Response) => {
          console.log(data);
          if (data.status === 200) {
            this.changed = true;

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

}
