import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayAssesPageRoutingModule } from './pay-asses-routing.module';

import { PayAssesPage } from './pay-asses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayAssesPageRoutingModule
  ],
  declarations: [PayAssesPage]
})
export class PayAssesPageModule {}
