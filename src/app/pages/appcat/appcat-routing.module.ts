import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppcatPage } from './appcat.page';

const routes: Routes = [
  {
    path: '',
    component: AppcatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppcatPageRoutingModule {}
