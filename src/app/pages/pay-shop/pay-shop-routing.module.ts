import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayShopPage } from './pay-shop.page';

const routes: Routes = [
  {
    path: '',
    component: PayShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayShopPageRoutingModule {}
