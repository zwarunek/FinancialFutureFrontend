import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  UnderConstructionPageComponent
} from "@app/pages/under-construction-page/under-construction-page.component";

const routes: Routes = [{
  path: '',
  component: UnderConstructionPageComponent,
  data: {
    title: "Long Term Financials, Financial Independence, Retire Early, Financial Predictions",
    description: "FinancialFuture.io will be a platform where you can make predictions about your " +
      "personal financial future. We are working hard to develop this new platform so stay " +
      "tuned and check back soon!"
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnderConstructionPageRoutingModule {
}
