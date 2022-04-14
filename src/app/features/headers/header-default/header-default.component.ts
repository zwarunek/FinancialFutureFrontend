import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {ThemeService} from "@core/services/theme.service";
import {AppComponent} from "@app/app.component";
import {AuthenticationService} from "@core/services/authentication.service";

const VIEW_MODE_KEY = "view-mode";

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.scss']
})
export class HeaderDefaultComponent implements OnInit {

  accountInfoItems: MenuItem[] = [];
  isLoggedIn = false;
  user?: any;


  items: MenuItem[];
  viewMode: string = "bootstrap4-dark-blue";

  constructor(private app: AppComponent, public themeService: ThemeService, private http: HttpClient, public router: Router, private authService: AuthenticationService) {
    this.items = [
      {
        label: 'Levels',
        routerLink: '/levels'
      }
    ];
    let viewMode = localStorage.getItem(VIEW_MODE_KEY);
    if (viewMode){
      this.viewMode = viewMode;
      this.themeService.switchTheme(this.viewMode);
    }
    else{
      localStorage.setItem(VIEW_MODE_KEY, this.viewMode);
    }
  }

  ngOnInit(): void {

    this.accountInfoItems = this.getItemsForAccountMenu();
    this.isLoggedIn = !!this.authService.getToken();

    if (this.isLoggedIn) {
      this.user = this.authService.getUser();
    }
  }

  logout() {
    this.authService.signOut();
    window.location.reload();
  }

  private toggleViewMode() {
    if (this.viewMode === "bootstrap4-dark-blue"){
      this.viewMode = "bootstrap4-light-blue";
    }
    else{
      this.viewMode = "bootstrap4-dark-blue";
    }
    localStorage.setItem(VIEW_MODE_KEY, this.viewMode);
    this.themeService.switchTheme(this.viewMode);
    this.accountInfoItems = this.getItemsForAccountMenu();
  }
  getItemsForAccountMenu(){
    return [
      {
        label: this.viewMode.includes("dark")? "Light Mode" : "Dark Mode",
        icon: this.viewMode.includes("dark")? "pi pi-sun" : "pi pi-moon",
        command: () => {
          this.toggleViewMode();
        }
      },
      {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ]
  }
}
