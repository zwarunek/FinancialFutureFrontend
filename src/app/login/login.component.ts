import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../_services";
import {MessageService} from "primeng/api";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: any;
  success: any;
  rememberMe: boolean = false;

  constructor(private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {
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

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmitPassword() {
    this.submitted = true;

    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.app.loadingAdd();
    this.loginForm.value.email = this.normalizeInput(this.loginForm.value.email);

    console.log(this.f['email'].value, this.f['password'].value);
    this.authService.login(this.f['email'].value, this.f['password'].value)
    .subscribe((data: Response) => {
        console.log(data);
        let token = data.headers.get("Authorization")
        if (data.status === 200) {
          this.authService.saveToken(token === null ? '' : token, this.f['rememberMe'].value)
          this.authService.saveUser(data.body, this.f['rememberMe'].value)
          this.router.navigate([this.returnUrl])
          .then(() => {
            window.location.reload();
          });
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
  normalizeInput(input: string): string {
    return input[0].toUpperCase() + input.substr(1).toLowerCase();
  }

  show() {
    this.messageService.add({severity: 'error', detail: this.error});
  }
}
