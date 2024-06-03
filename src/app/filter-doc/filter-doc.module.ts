import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterDocPageRoutingModule } from './filter-doc-routing.module';

import { FilterDocPage } from './filter-doc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterDocPageRoutingModule
  ],
  declarations: [FilterDocPage]
})
export class FilterDocPageModule {}
