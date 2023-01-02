import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminloginService } from '../service/adminlogin.service';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-stories-listing',
  templateUrl: './stories-listing.component.html',
  styleUrls: ['./stories-listing.component.css']
})
export class StoriesListingComponent implements OnInit {

  constructor(private service:ClientService,private adminservice:AdminloginService,private toast:NgToastService,private router:Router) { }
  storyList:any[]=[];
  itemPerPages:number = 9;
  page:number=1;
  totalStory:any;
  imageUrl:any;
  ngOnInit(): void {
    this.GetStoryList();
  }
  RedirectToShareStory(){
      var tokenDetail = this.adminservice.decodedToken();
      if(tokenDetail == null || tokenDetail.userType != 'user')
      {
        this.router.navigate(['']);
      }
      else if(tokenDetail.userImage == "")
      {
        this.toast.warning({detail:"Warning",summary:"First Fillup User Profile Detail",duration:3000});
        this.router.navigate([`userProfile/${tokenDetail.userId}`])
      }
      else
      {
        this.router.navigate(['shareyourstory']);
      }
  }

  GetStoryList(){
    this.service.StoryList().subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.storyList = data.data;
          this.storyList = this.storyList.map(x=> {
            var story=x.storyImage ? this.service.imageUrl + '/' + x.storyImage : 'assets/NoImg.png';
            return {
              id:x.id,
              missionId:x.missionId,
              userId:x.userId,
              userFullName:x.userFullName,
              userImage:x.userImage ? this.service.imageUrl + '/' + x.userImage : 'assets/NoUser.png',
              storyTitle:x.storyTitle,
              storyDate:x.storyDate,
              storyDescription:(x.storyDescription).replace(/<[^>]*>/g, ''),
              storyImage:story.split(',',1),
              videoUrl:x.videoUrl
            }
            this.totalStory = data.data.length;
          });
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }

}
