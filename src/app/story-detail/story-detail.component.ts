import { AnimateTimings } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgToastService } from 'ng-angular-popup';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-story-detail',
  templateUrl: './story-detail.component.html',
  styleUrls: ['./story-detail.component.css']
})
export class StoryDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  gallery:any[]=[];
  storyDetail:any;
  storyId:any;
  userImage:any;
  userName:any;
  imageList:any=[];
  constructor(private service:ClientService,public router:Router,public activeRoute:ActivatedRoute,private toast:NgToastService,public datePipe:DatePipe) { }


  ngOnInit(): void {
    this.storyId = this.activeRoute.snapshot.paramMap.get('Id');
     this.StoryDetail(this.storyId);
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        preview: false
      }
    ];
  }


  StoryDetail(id:any){

    this.service.StoryDetail(id).subscribe((data:any)=>{debugger;
        if(data.result == 1)
        {
          this.storyDetail = data.data;
          let dateformat = this.datePipe.transform(this.storyDetail.storyDate,'yyyy-MM-dd');
          this.storyDetail.storyDate = dateformat;
          this.userImage = this.service.imageUrl + '/'   + this.storyDetail.userImage;
          this.userName = this.storyDetail.userFullName;

          this.imageList = this.storyDetail.storyImage.split(',');

         this.galleryImages = this.getImages();

        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
    },err => this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }

  getImages() : NgxGalleryImage[] {
    const imageUrls : NgxGalleryImage[]=[];
    for (const photo of this.imageList) {
      imageUrls.push({
        small: this.service.imageUrl + '/' + photo.replaceAll('\\','/'),
        medium: this.service.imageUrl + '/' + photo.replaceAll('\\','/'),
        big: this.service.imageUrl + '/' + photo.replaceAll('\\','/')
      });
    }
    return imageUrls;
  }
  RedirectToMission(){
    this.router.navigate(['/home']);
  }
}
