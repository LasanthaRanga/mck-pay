import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindShopPage } from './find-shop.page';

const routes: Routes = [
  {
    path: '',
    component: FindShopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindShopPageRoutingModule {}
