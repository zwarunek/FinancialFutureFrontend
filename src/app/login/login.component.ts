import {Component, OnInit} from '@angular/core';
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
  submitted = false;
  returnUrl: string;
  error: any;
  success: any;
  rememberMe: boolean = false;
  notEnabled: boolean = false;

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

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmitPassword() {
    this.messageService.clear();
    this.submitted = true;
    this.notEnabled = false;
    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.app.loadingAdd();
    this.loginForm.value.email = this.normalizeInput(this.loginForm.value.email);

    this.authService.login(this.f['email'].value, this.f['password'].value)
    .subscribe((response: any) => {
        let token = response.headers.get("Authorization")
        if (response.status === 200) {
          if(token){
            this.authService.saveToken(token, this.f['rememberMe'].value)
            this.authService.saveUser(response.body, this.f['rememberMe'].value)
            this.router.navigate([this.returnUrl])
            .then(() => {
              window.location.reload();
            });
          }
          else{
            this.error = 'Username and Password do not match'
            this.show()
          }
        }
        this.app.loadingRemove();

      },
      (error: any) => {
        this.error = error;
        this.show();
        this.app.loadingRemove();
      });
  }

  verify() {
    console.log('here')
  }

  normalizeInput(input: string): string {
    return input[0].toUpperCase() + input.substr(1).toLowerCase();
  }

  show() {
    this.messageService.add({severity: 'error', summary: this.error});
  }
}
