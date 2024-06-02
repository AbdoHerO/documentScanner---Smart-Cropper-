import { Component, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('imageElement') imageElement: ElementRef<HTMLImageElement> | undefined;
  imageUrl: any;

  coordinates = [
    { x: 136.8, y: 4.8 },
    { x: 1401.6, y: 2.4 },
    { x: 1543.2, y: 1152.0 },
    { x: 0.0, y: 727.2 }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  onFileChange(event: any) {
    console.log('onFileChange');
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result as string);
          console.log("Image loaded");
          setTimeout(() => {
            console.log("Calling openCropper");
            this.openCropper();
          }, 100);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async openCropper() {
    console.log("Inside openCropper");
    const originalImage = document.getElementById('original') as HTMLImageElement;
    if (!originalImage) {
      console.log("Original image not found");
      return;
    }

    console.log("Original image found");
    document.body.style.overflow = 'hidden';
    const cropper = document.querySelector('image-cropper') as any;

    if (cropper && originalImage) {
      console.log("Setting cropper properties");
      cropper.img = originalImage;
      console.log('Image set in cropper:', cropper.img);
      cropper.inactiveSelections = [];
      cropper.quad = { points: this.coordinates };

      const cropperContainer = document.getElementById('cropper');
      if (cropperContainer) {
        cropperContainer.style.display = 'block';
        console.log("cropperContainer displayed:", cropperContainer);
      }
      console.log("Cropper opened");

      // Verify cropper initialization
      console.log("Cropper quad:", cropper.quad);
    } else {
      console.log("Cropper or original image not found");
    }
  }

  async getUpdatedCoordinates() {
    const cropper = document.querySelector('image-cropper') as any;
    if (cropper) {
      const updatedQuad = await cropper.getQuad();
      console.log('Updated Coordinates:', updatedQuad);
    }
  }
}
