import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindAssesPage } from './find-asses.page';

const routes: Routes = [
  {
    path: '',
    component: FindAssesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindAssesPageRoutingModule {}
