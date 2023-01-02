import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
declare var window:any;
@Component({
  selector: 'app-cmslist',
  templateUrl: './cmslist.component.html',
  styleUrls: ['./cmslist.component.css']
})
export class CMSListComponent implements OnInit {

  constructor(public service:AdminsideServiceService,public router:Router,public toastr:ToastrService,private toast: NgToastService) { }
  deleteModal:any;
  page: number = 1;
  itemsPerPages: number = 10;
  searchText:any='';
  cmsList:any[]=[];
  cmsId:any;
  ngOnInit(): void {
    this.FetchData();
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('removeCmsModal')
    );
  }
  OpenRemoveCmsModal(id:any){
    this.deleteModal.show();
    this.cmsId = id;
  }
  CloseRemoveCmsModal(){
    this.deleteModal.hide();
  }

  FetchData(){
      this.service.CMSList().subscribe((result:any)=>{
          if(result.result == 1)
          {
            this.cmsList = result.data;
          }
          else
          {
            this.toast.error({detail:"ERROR",summary:result.message,duration:3000});
          }
      });
  }

  DeleteCmsData(id:any){
    this.service.DeleteCMS(id).subscribe((data:any)=>{
        if(data.result == 1)
        {
          this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
          this.deleteModal.hide();
          window.location.reload();
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}));
  }
}
