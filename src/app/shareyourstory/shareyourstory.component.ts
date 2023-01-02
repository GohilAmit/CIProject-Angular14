import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import ValidateForm from '../Helper/ValidateForm';
import { AdminloginService } from '../service/adminlogin.service';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-shareyourstory',
  templateUrl: './shareyourstory.component.html',
  styleUrls: ['./shareyourstory.component.css']
})
export class ShareyourstoryComponent implements OnInit {
  imageList : any='';
  imageListArray : any=[];
  selectedFile:FileList;
  shareStoryForm:FormGroup;
  submitForm:boolean;
  missionTitleList:any[]=[];
  storyImg : any='';
  isFileUpload = true;
  formData = new FormData();
  loginUserId:any;
  constructor(public fb:FormBuilder,public toast:NgToastService,public router:Router,private service:ClientService,private loginservice:AdminloginService) { }

  ngOnInit(): void {
    this.loginservice.getCurrentUser().subscribe((data:any)=>{

      let loginUserDetail = this.loginservice.getUserDetail();
      data == null ? (this.loginUserId = loginUserDetail.userId) : (this.loginUserId = data.userId);
    });
      this.ShareStoryFormValidate();
      this.service.MissionTitleList().subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.missionTitleList = data.data;
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }
  ShareStoryFormValidate(){
    this.shareStoryForm = this.fb.group({
      missionId:[null,Validators.compose([Validators.required])],
      storyTitle:[null,Validators.compose([Validators.required,Validators.maxLength(255)])],
      storyDate:[null,Validators.compose([Validators.required])],
      storyDescription:[null,Validators.compose([Validators.required,Validators.maxLength(40000)])],
      videoUrl:[''],
      storyImage:[null,Validators.compose([Validators.required])]
    });
  }
  OnSelectedImage(e:any){debugger;
      const files = e.target.files;
      if(files.length > 20)
      {
        return this.toast.error({detail:"ERROR",summary:"Maximum 20 images can be added.",duration:3000});
      }
      if(files)
      {
        this.formData = new FormData();
        for(const file of files)
        {
          const reader = new FileReader();
          reader.onload = (event:any)=>{
            if(file.type.indexOf("image") > -1)
            {
              this.imageListArray.push({
                url:event.target.result,
                type:'img'
              });
            }
            else if(file.type.indexOf("video") > -1)
            {
              this.imageListArray.push({
                url:event.target.result,
                type:'video'
              });
            }
          }
          reader.readAsDataURL(file);
        }
        for(let i=0;i<files.length;i++)
        {
            this.formData.append('file',files[i]);
            this.formData.append('moduleName','ShareStory');
        }
        this.isFileUpload = true;
      }
  }
  OnRemoveImage(item:any){
      const index : number = this.imageListArray.indexOf(item);
      if(item !== -1)
      {
        this.imageListArray.splice(index,1);
      }
  }
  async OnSubmit(){

    let value = this.shareStoryForm.value;
    let imageUrl:any[] = [];
    if(this.shareStoryForm.valid)
    {
      if(this.isFileUpload)
      {
        await this.service.UploadImage(this.formData).pipe().toPromise().then((res:any)=>{
            if(res.success)
            {
              imageUrl = res.data;
            }
        },err=>{this.toast.error({detail:"ERROR",summary:err.message,duration:3000})});
      }
      let imgUrlList = imageUrl.map(e => e.replace(/\s/g, "")).join(",");
      value.storyImage = imgUrlList;
      value.userId = this.loginUserId;
      this.service.AddStory(value).subscribe((data:any)=>{
        if(data.result == 1)
        {
            this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
            setTimeout(() => {
              this.router.navigate(['storiesListing']);
            }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      });
    }
    else
    {
      ValidateForm.ValidateAllFormFields(this.shareStoryForm);
    }
  }
}
