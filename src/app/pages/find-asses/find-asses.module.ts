import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindAssesPageRoutingModule } from './find-asses-routing.module';

import { FindAssesPage } from './find-asses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindAssesPageRoutingModule
  ],
  declarations: [FindAssesPage]
})
export class FindAssesPageModule {}
