import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { MissionApplication } from 'src/app/model/missionApplication.model';
import { AdminloginService } from 'src/app/service/adminlogin.service';
import { ClientService } from 'src/app/service/client.service';
import { CommonService } from 'src/app/service/common.service';
import { DatePipe } from '@angular/common';
import dateFormat from 'dateformat';
import { Mission } from 'src/app/model/cms.model';
import * as moment from 'moment';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var window:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  missionList:any[]=[];
  userList:any[]=[];
  page:number=1;
  missionPerPages :number = 9;
  listmissionPerPages:number = 5;
  totalMission:any;
  searchParam:any;
  loginUserId:number=0;
  loginUserName:any;
  loginemailAddress:any;
  missionApplyModal:any;
  shareOrInviteModal:any;
  missionData:any;
  appliedDate:any;
  missionStatu:boolean = false;
  favImag:string='assets/Img/heart1.png';
  favImag1:string='assets/Img/heart11.png';
  view:'grid' | 'list' = 'grid';
  missionFavourite:boolean = false;
  public form: FormGroup;
  rating3:any;
  missionid:any;
  constructor(private service:ClientService,private toast:NgToastService,private router:Router,public commonservice:CommonService,private adminservice:AdminloginService,
    public datepipe: DatePipe,private fb: FormBuilder) {

      // this.form = this.fb.group({
      //   rating: [''],
      // })
    }
  ngOnInit(): void {
    this.adminservice.getCurrentUser().subscribe((data:any)=>{

      let loginUserDetail = this.adminservice.getUserDetail();
      data == null ? (this.loginUserId = loginUserDetail.userId) : (this.loginUserId = data.userId);
      data == null ? (this.loginUserName = loginUserDetail.fullName) : (this.loginUserName = data.fullName);
      data == null ? (this.loginemailAddress = loginUserDetail.emailAddress) : (this.loginemailAddress = data.emailAddress);
    });
    this.AllMissionList();
    this.commonservice.searchList.subscribe((data:any)=>{
        this.searchParam = data;
    });
    this.missionApplyModal = new window.bootstrap.Modal(
      document.getElementById('applyMissionModel')
    );
    this.shareOrInviteModal = new window.bootstrap.Modal(
      document.getElementById('shareinviteMissionModel')
    );
    this.missionData="";
  }
  OnChangeGrid(){
    this.view = 'grid';
  }
  OnChangeList(){
    this.view = 'list';
  }
  AllMissionList(){
    this.service.MissionList(this.loginUserId).subscribe((data:any) => {
      if(data.result == 1)
      {
        this.missionList = data.data;
        this.missionList = this.missionList.map(x=> {
          var missionimg=x.missionImages ? this.service.imageUrl + '/' + x.missionImages : 'assets/NoImg.png';
          this.rating3 =  x.rating;
          return {
            id:x.id,
            missionTitle:x.missionTitle,
            missionDescription:x.missionDescription,
            missionOrganisationName:x.missionOrganisationName,
            missionOrganisationDetail:x.missionOrganisationDetail,
            countryId:x.countryId,
            countryName:x.countryName,
            cityId:x.cityId,
            cityName:x.cityName,
            startDate:x.startDate,
            endDate:x.endDate,
            totalSheets:x.totalSheets,
            registrationDeadLine:x.registrationDeadLine,
            missionThemeId:x.missionThemeId,
            missionSkillId:x.missionSkillId,
            missionType:x.missionType,
            missionImages:missionimg.split(',',1),
            missionDocuments:x.missionDocuments,
            missionAvilability:x.missionAvilability,
            missionThemeName:x.missionThemeName,
            missionSkillName:x.missionSkillName,
            missionStatus:x.missionStatus,
            missionApplyStatus:x.missionApplyStatus,
            missionDateStatus:x.missionDateStatus,
            missionDeadLineStatus:x.missionDeadLineStatus,
            missionFavouriteStatus:x.missionFavouriteStatus,
            rating:this.rating3
            //rating:this.form.controls['rating'].setValue(x.rating)
          }
        });
        this.totalMission = data.data.length;
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        // this.toastr.error(data.message);
      }
  });
  }

  SortingData(e: any) {
    let selectedValue = e.target.value;
    if (selectedValue == 'a-z') {
      this.missionList.sort(function (a, b) {
        var a = a['missionTitle'].toLowerCase(),
            b = b['missionTitle'].toLowerCase();
        return a > b ? 1 : a < b ? -1 : 0;
      });
    }
    else {
      this.missionList.sort(function (a, b) {
        var a = a['missionTitle'].toLowerCase(),
            b = b['missionTitle'].toLowerCase();
        return a < b ? 1 : a > b ? -1 : 0;
      });
    }
  }
  SortingList(e:any)
  {
    let selectedVal = e.target.value;
    selectedVal = selectedVal == '' ? 'null' : selectedVal;
    let value = {
      userId:this.loginUserId,
      sortestValue:selectedVal
    }
    this.service.MissionClientList(value).subscribe((data:any) => {
      if(data.result == 1)
      {
        this.missionList = data.data;
        this.missionList = this.missionList.map(x=> {
          var missionimg=x.missionImages ? this.service.imageUrl + '/' + x.missionImages : 'assets/NoImg.png';
          return {
            id:x.id,
            missionTitle:x.missionTitle,
            missionDescription:x.missionDescription,
            missionOrganisationName:x.missionOrganisationName,
            missionOrganisationDetail:x.missionOrganisationDetail,
            countryId:x.countryId,
            countryName:x.countryName,
            cityId:x.cityId,
            cityName:x.cityName,
            startDate:x.startDate,
            endDate:x.endDate,
            totalSheets:x.totalSheets,
            registrationDeadLine:x.registrationDeadLine,
            missionThemeId:x.missionThemeId,
            missionSkillId:x.missionSkillId,
            missionType:x.missionType,
            missionImages:missionimg.split(',',1),
            missionDocuments:x.missionDocuments,
            missionAvilability:x.missionAvilability,
            missionThemeName:x.missionThemeName,
            missionSkillName:x.missionSkillName,
            missionStatus:x.missionStatus,
            missionApplyStatus:x.missionApplyStatus,
            missionDateStatus:x.missionDateStatus,
            missionDeadLineStatus:x.missionDeadLineStatus,
            missionFavouriteStatus:x.missionFavouriteStatus
          }
        });
        this.totalMission = data.data.length;
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        // this.toastr.error(data.message);
      }
  });
  }
  OpenMissionApplyModal(){
    this.missionApplyModal.show();
  }
  CloseMissionApplyModal(){
    this.missionApplyModal.hide();
  }
  CheckUserLoginOrNot(id:any)
  {
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
      var data = this.missionList.find((v:Mission)=> v.id == id);
      this.missionData = data;
      const now  = new Date();
      this.appliedDate = dateFormat(now,"dd/mm/yyyy h:MM:ss TT");
      this.missionApplyModal.show();
    }
  }
  RedirectVolunteering(missionId:any)
  {
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
      this.router.navigate([`volunteeringMission/${missionId}`]);
    }
  }
  ApplyMission()
  {
    let value={
      missionId:this.missionData.id,
      userId:this.loginUserId,
      appliedDate:moment().format("yyyy-MM-DDTHH:mm:ssZ"),
     status:false,
      sheet:1
    };
      this.service.ApplyMission(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            this.toast.success({detail:"SUCCESS",summary:data.data});
            setTimeout(() => {
              this.CloseMissionApplyModal();
              this.missionData.totalSheets = this.missionData.totalSheets - 1;
            }, 1000);
          }
          else
          {
            this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }

  MissionFavourite(missionId:any){
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
      this.missionFavourite = !this.missionFavourite;
      let value = {
        missionId : missionId,
        userId : this.loginUserId
      }
      if(this.missionFavourite)
      {

          this.service.AddMissionFavourite(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            this.AllMissionList();
          }
          else
          {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
       });
      }
      else
      {
          this.service.RemoveMissionFavourite(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            this.AllMissionList();
          }
          else
          {
              this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
        });
      }
    }
  }

  MissionRating(missionId:any)
  {
    debugger;
    let value={
      missionId:missionId,
      userId:this.loginUserId,
      rating:this.rating3
      //rating:this.form.value.rating
    }
         this.service.MissionRating(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
            //this.AllMissionList();
          }
          else
          {
            this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
           // this.AllMissionList();
          }
        });
  }

  OpenShareOrInviteMissionModal(missionId:any){
    this.shareOrInviteModal.show();
    this.missionid = missionId;
    this.getUserList();
  }
  CloseShareOrInviteMissionModal(){
    this.shareOrInviteModal.hide();
  }

  getUserList(){
    this.service.GetUserList(this.loginUserId).subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.userList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    })
  }
  usercheckedlist:any[]=[];
  GetUserCheckedList(isSelected,item){
      if(isSelected ==true){
        this.usercheckedlist.push({id:item.id,userFullName:item.userFullName,emailAddress:item.emailAddress,
                                    missionShareUserEmailAddress:this.loginemailAddress,baseUrl:document.location.origin,missionId:this.missionid})
      }
      else
      {
        this.usercheckedlist.map((a:any,index:any)=>{
          if(item.id == a.id)
          {
            this.usercheckedlist.splice(index,1)
          }
        })
      }
  }

  SendInviteMissionMail()
  {
    if(this.usercheckedlist.length == 0)
    {
      return this.toast.error({detail:"ERROR",summary:"At least one checkbox is required to check",duration:30000});
    }
    let userdata = this.usercheckedlist;

    this.service.SendInviteMissionMail(userdata).subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.toast.success({detail:"ERROR",summary:data.data,duration:3000});
        setTimeout(() => {
          this.CloseShareOrInviteMissionModal();
          window.location.reload();
        }, 1000);
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    })
  }
}
