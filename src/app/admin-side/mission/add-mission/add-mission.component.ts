import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';
import {  NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import { NgToastService } from 'ng-angular-popup';
import { read } from '@popperjs/core';


@Component({
  selector: 'app-add-mission',
  templateUrl: './add-mission.component.html',
  styleUrls: ['./add-mission.component.css']
})
export class AddMissionComponent implements OnInit {
  addMissionForm:FormGroup;
  formValid:boolean;
  selCountryId:any;
  countryList:any[]=[];
  cityList:any[]=[];
  typeFlag:boolean = false;
  missionThemeList:any[]=[];
  missionSkillList:any[]=[];
  missionDoc:any;
  missionImage : any='';
  isFileUpload = true;
  isMissionDocUpload=false;
  formData = new FormData();
  formDoc = new FormData();
  imageListArray : any=[];
  missionAvilabilitys = ["missionAvilability1","missionAvilability2","missionAvilability3","missionAvilability4","missionAvilability5"]
  constructor(public fb:FormBuilder,public service:AdminsideServiceService,public toastr:ToastrService,public router:Router,public datePipe:DatePipe,private toast:NgToastService) { }

  ngOnInit(): void {
    this.addMissionFormValid();
    this.CountryList();
    this.GetMissionSkillList();
    this.GetMissionThemeList();
    this.missionDoc='';
  }

  addMissionFormValid(){
      this.addMissionForm = this.fb.group({
        countryId:[null,Validators.compose([Validators.required])],
        cityId:[null,Validators.compose([Validators.required])],
          missionTitle : [null,Validators.compose([Validators.required])],
          missionDescription:[null,Validators.compose([Validators.required])],
          missionOrganisationName:[null,Validators.compose([Validators.required])],
          missionOrganisationDetail:[null,Validators.compose([Validators.required])],
          startDate : [null,Validators.compose([Validators.required])],
          endDate : [null,Validators.compose([Validators.required])],
          missionType : [null,Validators.compose([Validators.required])],
          totalSheets : [null],
          registrationDeadLine : [null],
          missionVideoUrl:[''],
          missionThemeId : [null,Validators.compose([Validators.required])],
          missionSkillId : [null,Validators.compose([Validators.required])],
          missionImages : [null,Validators.compose([Validators.required])],
          missionDocuments : [''],
          missionAvilability : [null,Validators.compose([Validators.required])]
      });
  }
  get countryId() { return this.addMissionForm.get('countryId') as FormControl; }
  get cityId() { return this.addMissionForm.get('cityId') as FormControl; }
  get missionTitle() { return this.addMissionForm.get('missionTitle') as FormControl; }
  get missionOrganisationName() { return this.addMissionForm.get('missionOrganisationName') as FormControl; }
  get missionDescription() { return this.addMissionForm.get('missionDescription') as FormControl; }
  get missionOrganisationDetail() { return this.addMissionForm.get('missionOrganisationDetail') as FormControl; }
  get startDate() { return this.addMissionForm.get('startDate') as FormControl; }
  get endDate() { return this.addMissionForm.get('endDate') as FormControl; }
  get missionType() { return this.addMissionForm.get('missionType') as FormControl; }
  get missionThemeId() { return this.addMissionForm.get('missionThemeId') as FormControl; }
  get missionSkillId() { return this.addMissionForm.get('missionSkillId') as FormControl; }
  get missionImages() { return this.addMissionForm.get('missionImages') as FormControl; }
  get missionDocuments() { return this.addMissionForm.get('missionDocuments') as FormControl; }
  get missionAvilability() { return this.addMissionForm.get('missionAvilability') as FormControl; }


  CountryList(){
      this.service.CountryList().subscribe((data:any)=>{
        if(data.result == 1)
        {
            this.countryList = data.data;
        }
        else
        {
            this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      });
  }
  CityList(countryId:any){
    countryId = countryId.target.value;
    this.service.CityList(countryId).subscribe((data:any)=>{
      if(data.result == 1)
      {
          this.cityList = data.data;
      }
      else
      {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    });
  }
  HideOrShow(e:any)
  {
      if(e.target.value == "Time")
      {
        this.typeFlag = true;
      }
      else{
      this.typeFlag = false;
    }
  }
  GetMissionSkillList(){
      this.service.GetMissionSkillList().subscribe((data:any)=>{
        if(data.result==1)
        {
          this.missionSkillList = data.data;
        }
        else{
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }
  GetMissionThemeList(){
    this.service.GetMissionThemeList().subscribe((data:any)=>{
      if(data.result==1)
      {
        this.missionThemeList = data.data;
      }
      else{
        this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
      }
    },err=>this.toast.error({detail:"ERROR",summary:err.message,duration:3000}))
  }

  OnSelectedImage(event:any){
    const files = event.target.files;
    if(this.imageListArray.length > 5)
    {
      return this.toast.error({detail:"ERROR",summary:"Maximum 6 images can be added.",duration:3000});
    }
    if(files)
    {
      this.formData = new FormData();
      for(const file of files)
      {
        const reader = new FileReader();
        reader.onload = (e:any)=>{
            this.imageListArray.push(e.target.result);
        }
        reader.readAsDataURL(file)
      }
      for(let i=0;i<files.length;i++)
      {
          this.formData.append('file',files[i]);
          this.formData.append('moduleName','Mission');
      }
      this.isFileUpload = true;
      console.log(this.formData);

    }
  }

  OnSelectedDoc(event:any){
    if(event.target.files && event.target.files[0])
    {
      this.formDoc = new FormData();
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload =(e:any)=>{
          this.missionDoc = 'Document Apply Successfullly';
      }

      for(let i=0;i<event.target.files.length;i++)
      {
          this.formDoc.append('file',event.target.files[i]);
          this.formDoc.append('moduleName','MissionDoc');
      }
      this.isMissionDocUpload = true;
    }
}

  async OnSubmit(){
    this.formValid = true;
    let imageUrl:any[] = [];
    let missionDoc = '';
    let value = this.addMissionForm.value;
    value.missionSkillId = Array.isArray(value.missionSkillId) ? value.missionSkillId.join(',') : value.missionSkillId;
    if(this.addMissionForm.valid)
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
      if(this.isMissionDocUpload)
      {
        await this.service.UploadDoc(this.formDoc).pipe().toPromise().then((res:any)=>{
            if(res.success)
            {
              missionDoc = res.data;
            }
        },err=>{this.toast.error({detail:"ERROR",summary:err.message,duration:3000})});
      }
      let imgUrlList = imageUrl.map(e => e.replace(/\s/g, "")).join(",");
      value.missionImages = imgUrlList;
      value.missionDocuments = missionDoc;
      this.service.AddMission(value).subscribe((data:any)=>{

        if(data.result == 1)
        {
            this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
            setTimeout(() => {
              this.router.navigate(['admin/mission']);
            }, 1000);
        }
        else
        {
          this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          //this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
        }
      });
      this.formValid = false;
    }
  }
  OnCancel()
  {
    this.router.navigateByUrl('admin/mission');
  }
  OnRemoveImages(item:any){debugger;
    const index : number = this.imageListArray.indexOf(item);
    if(item !== -1)
    {
      this.imageListArray.splice(index,1);
    }
  }
  OnRemoveImage(item:any){debugger;
    this.formData.delete(item);
    console.log(this.formData);
    const index : number = this.imageListArray.indexOf(item);
    if(item !== -1)
    {
      this.imageListArray.splice(index,1);
    }
  }
}

