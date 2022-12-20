import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-volun-volunteering-mission',
  templateUrl: './volun-volunteering-mission.component.html',
  styleUrls: ['./volun-volunteering-mission.component.css']
})
export class VolunVolunteeringMissionComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit(): void {
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:true
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/Images1/1.png',
        medium: 'assets/Images1/1.png',
        big: 'assets/Images1/1.png'
      },
      {
        small: 'assets/Images1/32.png',
        medium: 'assets/Images1/32.png',
        big: 'assets/Images1/32.png'
      },{
        small: 'assets/Images1/3.png',
        medium: 'assets/Images1/3.png',
        big: 'assets/Images1/3.png'
      },
      {
        small: 'assets/Images1/34.png',
        medium: 'assets/Images1/34.png',
        big: 'assets/Images1/34.png'
      }
    ];
  }

}
