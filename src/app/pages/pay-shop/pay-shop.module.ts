import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayShopPageRoutingModule } from './pay-shop-routing.module';

import { PayShopPage } from './pay-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayShopPageRoutingModule
  ],
  declarations: [PayShopPage]
})
export class PayShopPageModule {}
