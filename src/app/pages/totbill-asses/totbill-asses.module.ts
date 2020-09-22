import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotbillAssesPageRoutingModule } from './totbill-asses-routing.module';

import { TotbillAssesPage } from './totbill-asses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotbillAssesPageRoutingModule
  ],
  declarations: [TotbillAssesPage]
})
export class TotbillAssesPageModule {}
