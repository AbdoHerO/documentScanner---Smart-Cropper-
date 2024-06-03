import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-doc',
  templateUrl: './filter-doc.page.html',
  styleUrls: ['./filter-doc.page.scss'],
})
export class FilterDocPage implements OnInit {
  isScanning: boolean = false;
  hideAnimation: boolean = false;

  isScanning_2: boolean = false;
  hideAnimation_2: boolean = false;

  constructor() {}

  applyFilter() {
    this.isScanning = !this.isScanning;
    if (this.isScanning) {
      setTimeout(() => {
        this.hideAnimation = true;
      }, 2000);
      this.hideAnimation = false;
    }
  }

  applyFilter_2() {
    this.isScanning_2 = !this.isScanning_2;
    if (this.isScanning_2) {
      setTimeout(() => {
        this.hideAnimation_2 = true;
      }, 2000);
      this.hideAnimation_2 = false;
    }
  }

  ngOnInit() {}
}
