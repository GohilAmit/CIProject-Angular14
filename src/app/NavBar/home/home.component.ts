import { Component, OnInit } from '@angular/core';
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
import * as _moment from 'moment';
import * as moment from 'moment';
declare var window:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  missionList:any[]=[];
  page:number=1;
  missionPerPages :number = 9;
  totalMission:any;
  searchParam:any;
  loginUserId:number=0;
  loginUserName:any;
  missionApplyModal:any;
  missionData:any;
  appliedDate:any;
  constructor(private service:ClientService,private toast:NgToastService,private router:Router,public commonservice:CommonService,private adminservice:AdminloginService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.adminservice.getCurrentUser().subscribe((data:any)=>{

      let loginUserDetail = this.adminservice.getUserDetail();
      data == null ? (this.loginUserId = loginUserDetail.userId) : (this.loginUserId = data.userId);
      data == null ? (this.loginUserName = loginUserDetail.fullName) : (this.loginUserName = data.fullName);
    });
    this.AllMissionList();
    this.commonservice.searchList.subscribe((data:any)=>{
        this.searchParam = data;
    });
    this.missionApplyModal = new window.bootstrap.Modal(
      document.getElementById('applyMissionModel')
    );
    this.missionData="";
  }

  AllMissionList(){
    this.service.MissionList().subscribe((data:any) => {
      if(data.result == 1)
      {
        this.missionList = data.data;
        this.missionList = this.missionList.map(x=> {

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
            missionTheme:x.missionTheme,
            missionSkill:x.missionSkill,
            missionImages:x.missionImages ? this.service.imageUrl + '/' + x.missionImages : 'assets/NoImg.png',
            missionDocuments:x.missionDocuments,
            missionAvilability:x.missionAvilability
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
        this.router.navigate(['login']);
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
            this.toast.error({summary:data.message});
          }
      },err=>this.toast.error({detail:"ERROR",summary:err.message}))
  }
}
