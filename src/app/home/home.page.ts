import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('imageElement') imageElement: ElementRef<HTMLImageElement> | undefined;
  imageUrl: any;
  magnifierElement: HTMLElement | undefined;

  coordinates = [
    { x: 136.8, y: 4.8 },
    { x: 1401.6, y: 2.4 },
    { x: 1543.2, y: 1152.0 },
    { x: 0.0, y: 727.2 }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    this.addMagnifierEventListeners();
  }

  onFileChange(event: any) {
    console.log('onFileChange called');
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result as string);
          console.log('Image loaded');
          setTimeout(() => {
            console.log('Calling openCropper');
            this.openCropper();
          }, 100);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async openCropper() {
    console.log('Inside openCropper');
    const originalImage = document.getElementById('original') as HTMLImageElement;
    if (!originalImage) {
      console.log('Original image not found');
      return;
    }

    document.body.style.overflow = 'hidden';
    const cropper = document.querySelector('image-cropper') as any;

    if (cropper && originalImage) {
      console.log('Setting cropper properties');
      cropper.img = originalImage;
      cropper.inactiveSelections = [];
      cropper.quad = { points: this.coordinates };

      const cropperContainer = document.getElementById('cropper');
      if (cropperContainer) {
        cropperContainer.style.display = 'block';
        console.log('Cropper container displayed');
        setTimeout(() => {
          console.log('Adding magnifier event listeners');
          this.addMagnifierEventListeners();
        }, 100); // Give it some time to render the elements
      }
    } else {
      console.log('Cropper or original image not found');
    }
  }

  async getUpdatedCoordinates() {
    const cropper = document.querySelector('image-cropper') as any;
    if (cropper) {
      const updatedQuad = await cropper.getQuad();
      console.log('Updated Quad:', updatedQuad);
    } else {
      console.log('Cropper not found');
    }
  }

  addMagnifierEventListeners() {
    console.log('Adding magnifier event listeners');
    this.magnifierElement = document.createElement('div');
    this.magnifierElement.classList.add('magnifier');
    document.body.appendChild(this.magnifierElement);
    console.log('Magnifier element added to the DOM');

    const cropperElement = document.querySelector('image-cropper') as any;
    if (cropperElement) {
      console.log('Cropper element found');
      const shadowRoot = cropperElement.shadowRoot;
      if (shadowRoot) {
        console.log('Shadow root found');
        this.observeShadowDom(shadowRoot);
      } else {
        console.log('Shadow root not found');
      }
    } else {
      console.log('Cropper element not found');
    }
  }

  observeShadowDom(shadowRoot: ShadowRoot) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          console.log('Nodes added to shadow DOM');
          const rects = shadowRoot.querySelectorAll('rect.cropper-controls');
          rects.forEach((rect) => {
            const svgRect = rect as SVGRectElement;
            console.log('Adding event listeners to rect elements');
            svgRect.addEventListener('mouseenter', (e: MouseEvent) => this.showMagnifier(e, svgRect));
            svgRect.addEventListener('mousemove', (e: MouseEvent) => this.moveMagnifier(e));
            svgRect.addEventListener('mouseleave', () => this.hideMagnifier());
          });
        }
      });
    });

    observer.observe(shadowRoot, { childList: true, subtree: true });
    console.log('MutationObserver is now observing the shadow DOM');
  }

  showMagnifier(e: MouseEvent, rect: SVGRectElement) {
    console.log('Magnifier show triggered');
    if (this.magnifierElement) {
      this.magnifierElement.style.display = 'block';
      this.moveMagnifier(e);
      this.magnifierElement.style.backgroundImage = `url(${(document.getElementById('original') as HTMLImageElement).src})`;
      console.log('Magnifier background image set');
    }
  }

  moveMagnifier(e: MouseEvent) {
    if (this.magnifierElement) {
      const magnifierSize = 100; // Size of the magnifier
      this.magnifierElement.style.left = `${e.clientX - magnifierSize / 2}px`;
      this.magnifierElement.style.top = `${e.clientY - magnifierSize / 2}px`;

      if(this.imageElement){
      const rect = this.imageElement?.nativeElement.getBoundingClientRect();
      const scale = this.imageElement?.nativeElement.naturalWidth / rect.width;
      const backgroundX = -((e.clientX - rect.left) * scale - magnifierSize / 2);
      const backgroundY = -((e.clientY - rect.top) * scale - magnifierSize / 2);
      this.magnifierElement.style.backgroundPosition = `${backgroundX}px ${backgroundY}px`;
      this.magnifierElement.style.backgroundSize = `${this.imageElement?.nativeElement.naturalWidth}px ${this.imageElement?.nativeElement.naturalHeight}px`;
      console.log('Magnifier moved to:', e.clientX, e.clientY);
    }}
  }

  hideMagnifier() {
    if (this.magnifierElement) {
      this.magnifierElement.style.display = 'none';
      console.log('Magnifier hidden');
    }
  }
}
