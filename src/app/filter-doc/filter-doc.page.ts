import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-doc',
  templateUrl: './filter-doc.page.html',
  styleUrls: ['./filter-doc.page.scss'],
})
export class FilterDocPage implements OnInit {

  isScanning: boolean = false;
  hideAnimation: boolean = false;

  constructor() {}

  applyFilter() {
    this.isScanning = !this.isScanning;
    setTimeout(() => {
      this.hideAnimation = true
    }, 2000);
    this.hideAnimation = false
  }
  
  ngOnInit() {
  }
}
