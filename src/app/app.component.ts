import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinancialFuture';
  loading: boolean = false;
  numberOfLoading: number = 0;
  constructor() {
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
