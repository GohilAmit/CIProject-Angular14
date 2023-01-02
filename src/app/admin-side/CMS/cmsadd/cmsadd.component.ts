import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';

@Component({
  selector: 'app-cmsadd',
  templateUrl: './cmsadd.component.html',
  styleUrls: ['./cmsadd.component.css']
})
export class CMSAddComponent implements OnInit {

  constructor(public router:Router,public fb:FormBuilder,public toastr:ToastrService,public service:AdminsideServiceService,private toast: NgToastService) { }
  addCmsForm:FormGroup;
  formValid:boolean;
  ngOnInit(): void {
    this.addCmsFormValid();
  }
  addCmsFormValid(){
      this.addCmsForm = this.fb.group({
        title:[null,Validators.compose([Validators.required])],
        description:[null,Validators.compose([Validators.required])],
        slug:[null,Validators.compose([Validators.required])],
        status:[null,Validators.compose([Validators.required])]
      });
  }
  get title(){
    return this.addCmsForm.get('title') as FormControl;
  }
  get description(){
    return this.addCmsForm.get('description') as FormControl;
  }
  get slug(){
    return this.addCmsForm.get('slug') as FormControl;
  }
  get status(){
    return this.addCmsForm.get('status') as FormControl;
  }
  OnSubmit(){
    debugger;
      this.formValid = true;
      if(this.addCmsForm.valid)
      {
        let addFormValue = this.addCmsForm.value;
        this.service.AddCMS(addFormValue).subscribe((data:any)=>{
          if(data.result==1)
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
        })
        this.formValid = false;
      }
  }
  OnCancel(){
    this.router.navigateByUrl('admin/cms');
  }
}
