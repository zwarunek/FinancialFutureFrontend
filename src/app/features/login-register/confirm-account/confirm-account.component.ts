import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {UserService} from "@core/services/user.service";
import {AppComponent} from "@app/app.component";
import {AuthenticationService} from "@core/services/authentication.service";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss'],
  providers: [MessageService]
})
export class ConfirmAccountComponent implements OnInit {

  token: any;
  error: any;
  confirmed: boolean = false;
  expired: boolean = false;
  showError: boolean = false;
  sent: boolean = false;
  accountDetails: any;
  captchaVerified: any;

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {

    this.token = this.route.snapshot.queryParamMap.get('token'); }

  ngOnInit(): void {
    if (this.token == null) {
      this.showError = true
    } else {
      this.userService.confirmAccount(this.token)
      .subscribe((response: any) => {
          console.log(response);
          if (response.status === 200 && response.body.data) {
            if (response.body.data === 'Invalid Token') {
              this.showError = true;
            }
            if (response.body.data === 'Successful') {
              this.confirmed = true;
              this.accountDetails = response.body.account;
            }
            if (response.body.data === 'Expired Token') {
              this.expired = true;
              this.accountDetails = response.body.account;
            }
          } else {
            this.error = response.status.toString();
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
  resendLink(){
    this.userService.sendConfirmationTokenToEmail(this.accountDetails.username)
    .subscribe((data: Response) => {
        if (data.status === 200) {
          this.sent = true;
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
