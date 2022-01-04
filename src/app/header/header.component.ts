import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ThemeService} from "../theme.service";
import {AuthenticationService} from "../_services";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from "rxjs";
import {AppComponent} from "../app.component";

const VIEW_MODE_KEY = "view-mode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  accountInfoItems: MenuItem[] = [];
  isLoggedIn = false;
  user?: any;


  items: MenuItem[];
  viewMode: string = "bootstrap4-dark-blue";

  constructor(private app: AppComponent, public themeService: ThemeService, private http: HttpClient, public router: Router, private authService: AuthenticationService) {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark'
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video'
              },

            ]
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left'
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right'
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center'
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify'
          },

        ]
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',

          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',

          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print'
                  }
                ]
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          }
        ]
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              },

            ]
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          }
        ]
      },
      {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
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

  test() {
    console.log(this.router.url)
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
        label: 'Start Loading',
        icon: 'pi pi-spin pi-spinner',
        command: () => {
          this.app.loadingAdd();
        }
      },
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
