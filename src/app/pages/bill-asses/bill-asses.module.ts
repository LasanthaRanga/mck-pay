import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillAssesPageRoutingModule } from './bill-asses-routing.module';

import { BillAssesPage } from './bill-asses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillAssesPageRoutingModule
  ],
  declarations: [BillAssesPage]
})
export class BillAssesPageModule {}
