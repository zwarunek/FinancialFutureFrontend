import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService, UserService} from "../_services";
import {MessageService} from "primeng/api";
import {MustMatch} from "../_helpers";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;
  success: any;
  sent: boolean = false;

  constructor(private userService: UserService, private app: AppComponent, private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService, private messageService: MessageService) {

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

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {

  }

  onSubmitPassword() {
    console.log(this.loginForm);
    this.submitted = true;

    this.error = null;
    this.success = null;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.app.loadingAdd();
    this.loginForm.value.username = this.normalizeInput(this.loginForm.value.username);
    this.loginForm.value.firstName = this.normalizeInput(this.loginForm.value.firstName);
    this.loginForm.value.lastName = this.normalizeInput(this.loginForm.value.lastName);
    delete this.loginForm.value.confirmPassword;
    this.userService.register(this.loginForm.value)
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

  normalizeInput(input: string): string {
    return input.toLowerCase();
  }

  show() {
    this.messageService.add({severity: 'error', detail: this.error});
  }
}
