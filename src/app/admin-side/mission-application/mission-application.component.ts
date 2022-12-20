import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';

@Component({
  selector: 'app-mission-application',
  templateUrl: './mission-application.component.html',
  styleUrls: ['./mission-application.component.css']
})
export class MissionApplicationComponent implements OnInit {
  applicationList:any[]=[];
  searchText:any="";
  page:number = 1;
  itemsPerPages:number = 10;
  constructor(public service:AdminsideServiceService,private toast:NgToastService,private route:Router) { }

  ngOnInit(): void {
    this.FetchMissionApplicationList();
  }
  FetchMissionApplicationList(){
    this.service.MissionApplicationList().subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.applicationList = data.data;
      }
      else
      {
        this.toast.error({detail:"ERROR",summary:data.message});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message}));
  }
}
