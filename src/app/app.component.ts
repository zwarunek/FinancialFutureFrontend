import { Component } from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinancialFuture';
  loading: boolean = false;
  numberOfLoading: number = 0;
  prod: boolean;
  env: string;
  constructor() {
    this.prod = environment.production;
    this.env = environment.env;
  }
  loadingAdd(){
    this.numberOfLoading++;
    this.loading = true;
  }
  loadingRemove(){
    this.numberOfLoading--;
    if(this.numberOfLoading < 0){
      this.numberOfLoading = 0;
    }
    if(this.numberOfLoading === 0){
      this.loading = false;
    }
  }
}
