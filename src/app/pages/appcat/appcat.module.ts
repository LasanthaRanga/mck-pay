import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppcatPageRoutingModule } from './appcat-routing.module';

import { AppcatPage } from './appcat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppcatPageRoutingModule
  ],
  declarations: [AppcatPage]
})
export class AppcatPageModule {}
