import { Component, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnChanges{
  @ViewChild('imageElement') imageElement: ElementRef<HTMLImageElement> | undefined;
  imageUrl: any;

  coordinates = [
    { x: 136.8, y: 4.8 },
    { x: 1401.6, y: 2.4 },
    { x: 1543.2, y: 1152.0 },
    { x: 0.0, y: 727.2 }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.addEventListenerToAcceptUse();

  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result as string);
          setTimeout(() => {
            this.openCropper();
          }, 100);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async openCropper() {
    const originalImage = document.getElementById('original') as HTMLImageElement;
    if (!originalImage) {
      return;
    }

    document.body.style.overflow = 'hidden';
    const cropper = document.querySelector('image-cropper') as any;

    if (cropper && originalImage) {
      cropper.img = originalImage;
      cropper.inactiveSelections = [];
      cropper.quad = { points: this.coordinates };

      const cropperContainer = document.getElementById('cropper');
      if (cropperContainer) {
        cropperContainer.style.display = 'block';
        // this.addEventListenerToAcceptUse();
      }
    } else {
    }
  }

  async getUpdatedCoordinates() {
    const cropper = document.querySelector('image-cropper') as any;
    if (cropper) {
      const updatedQuad = await cropper.getQuad();
      console.log("updatedQuad : ", updatedQuad)
      console.log("quaaad : ", cropper.quad)
    }else{
      console.log("cropper not found")
    }


  }

  addEventListenerToAcceptUse() {
    const acceptUseDiv = document.querySelector('.accept-use');
    if (acceptUseDiv) {
      acceptUseDiv.addEventListener('click', () => {
        this.logCropperPoints();
      });
    } else {
      console.error('accept-use div not found');
    }
  }

  logCropperPoints() {
    const cropper = document.querySelector('image-cropper') as any;
    if (cropper) {
      const pointsData = cropper.getPointsData();
    } else {
      console.error('Cropper element not found');
    }
  }
}
