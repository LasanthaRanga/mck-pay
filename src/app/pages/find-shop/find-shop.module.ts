import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindShopPageRoutingModule } from './find-shop-routing.module';

import { FindShopPage } from './find-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindShopPageRoutingModule
  ],
  declarations: [FindShopPage]
})
export class FindShopPageModule {}
