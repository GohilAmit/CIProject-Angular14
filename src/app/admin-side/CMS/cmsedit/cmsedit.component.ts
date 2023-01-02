import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { THRESHOLD_DIFF } from '@progress/kendo-angular-popup/services/scrollable.service';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';

@Component({
  selector: 'app-cmsedit',
  templateUrl: './cmsedit.component.html',
  styleUrls: ['./cmsedit.component.css']
})
export class CMSEditComponent implements OnInit {
  cmsId:any;
  editCMSForm:FormGroup;
  formValid:boolean;
  editData:any;
  constructor(public router:Router,public fb:FormBuilder,public service:AdminsideServiceService,public toastr:ToastrService,public activateRoute:ActivatedRoute,private toast: NgToastService) {
      this.cmsId = this.activateRoute.snapshot.paramMap.get("Id");
      if(this.cmsId != 0)
      {
        this.FetchData(this.cmsId);
      }
   }

  ngOnInit(): void {
  }

  FetchData(id:any)
  {
      this.service.CMSDetailById(id).subscribe((data:any)=>{
        this.editData = data.data;
        this.editCMSForm = this.fb.group({
          id:[this.editData.id],
          title:[this.editData.title,Validators.compose([Validators.required])],
          description:[this.editData.description,Validators.compose([Validators.required])],
          slug:[this.editData.slug,Validators.compose([Validators.required])],
          status:[this.editData.status,Validators.compose([Validators.required])]
        });
      },err => this.toastr.error(err.message));
  }
  get title()
  {
    return this.editCMSForm.get('title') as FormControl;
  }
  get description(){
    return this.editCMSForm.get('description') as FormControl;
  }
  get slug(){
    return this.editCMSForm.get('slug') as FormControl;
  }
  get status(){
    return this.editCMSForm.get('status') as FormControl;
  }
  OnSubmit(){
      this.formValid = true;
      if(this,this.editCMSForm.valid)
      {
        let editFormValue = this.editCMSForm.value;
        this.service.UpdateCMS(editFormValue).subscribe((data:any)=>{
              if(data.result == 1)
              {
                this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
                setTimeout(() => {
                  this.router.navigate(['admin/cms']);
                }, 1000);
              }
              else
              {
                this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
              }
        });
      }
  }
  OnCancel(){
    this.router.navigateByUrl('admin/cms');
  }
}
