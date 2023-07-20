import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserviewPageRoutingModule } from './userview-routing.module';

import { UserviewPage } from './userview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserviewPageRoutingModule
  ],
  declarations: [UserviewPage]
})
export class UserviewPageModule {}
