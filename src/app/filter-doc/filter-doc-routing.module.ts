import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterDocPage } from './filter-doc.page';

const routes: Routes = [
  {
    path: '',
    component: FilterDocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterDocPageRoutingModule {}
