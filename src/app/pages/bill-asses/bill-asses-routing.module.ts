import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillAssesPage } from './bill-asses.page';

const routes: Routes = [
  {
    path: '',
    component: BillAssesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillAssesPageRoutingModule {}
