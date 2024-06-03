import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-doc',
  templateUrl: './filter-doc.page.html',
  styleUrls: ['./filter-doc.page.scss'],
})
export class FilterDocPage implements OnInit {

  isScanning: boolean = false;

  constructor() {}

  applyFilter() {
    this.isScanning = !this.isScanning;
  }

  ngOnInit() {
  }
}
