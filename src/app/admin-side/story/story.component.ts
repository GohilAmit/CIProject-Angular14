import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(private service:AdminsideServiceService,private route:Router,private toast:NgToastService,private datePipe:DatePipe) { }
  deleteStoryModal:any;
  viewStoryModal:any;
  page:number = 1;
  itemsPerPages:number = 10;
  searchText:any = '';
  storyList:any='';
  storyId:any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  storyDetail:any;
  userImage:any;
  userName:any;
  imageList:any=[];
  ngOnInit(): void {
    this.FetchStoryList();
    this.deleteStoryModal = new window.bootstrap.Modal(
      document.getElementById('removeStoryModal')
    );
    this.viewStoryModal = new window.bootstrap.Modal(
      document.getElementById('viewStoryModal')
    );
    this.galleryOptions = [
      {
        width: '100%',
        height: '450px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        preview: false
      }
    ];
    this.storyDetail="";
  }
  FetchStoryList(){
    this.service.StoryList().subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.storyList = data.data;
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
    },err=>this.toast.error({detail:"ERROR",summary:err.error.message,duration:3000}));
  }

  ActiveStory(item:any)
  {
    item.isActive = true;
    this.service.UpdaeStorySatus(item).subscribe((data:any)=>{
        if(data.result==1)
        {
              this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
  DeActiveStory(item:any)
  {
    item.isActive = false;
    this.service.UpdaeStorySatus(item).subscribe((data:any)=>{
        if(data.result==1)
        {
              this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
  OpenModal(id:any){
    this.deleteStoryModal.show();
    this.storyId = id;
  }
  CloseModal(){
    this.deleteStoryModal.hide();
  }
  OpenViewModal(id:any){
    this.viewStoryModal.show();
    this.storyId = id;
    this.StoryDetail(this.storyId);
  }
  CloseViewModal(){
    this.viewStoryModal.hide();
  }
  DeleteStory(){
    this.service.DeleteStory(this.storyId).subscribe((data:any)=>{
      if(data.result == 1)
      {
        //this.toastr.success(data.data);
        this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
        setTimeout(() => {
          this.deleteStoryModal.hide();
        window.location.reload();
        }, 2000);
      }
      else
      {
        //this.toastr.error(data.message);
        this.toast.error({detail:"ERORR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

  ViewStory(){}

  StoryDetail(id:any){

    this.service.StoryDetail(id).subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.storyDetail = data.data;
          this.userImage = this.service.imageUrl + '/'   + this.storyDetail.userImage;
          this.storyDetail.storyDescription = this.storyDetail.storyDescription.replace(/<[^>]*>/g, '');

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
}
