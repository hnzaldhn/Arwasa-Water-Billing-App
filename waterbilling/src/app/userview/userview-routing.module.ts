import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserviewPage } from './userview.page';

const routes: Routes = [
  {
    path: '',
    component: UserviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserviewPageRoutingModule {}
