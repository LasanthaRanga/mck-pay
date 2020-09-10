import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayAssesPage } from './pay-asses.page';

const routes: Routes = [
  {
    path: '',
    component: PayAssesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayAssesPageRoutingModule {}
