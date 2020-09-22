import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotbillAssesPage } from './totbill-asses.page';

const routes: Routes = [
  {
    path: '',
    component: TotbillAssesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotbillAssesPageRoutingModule {}
