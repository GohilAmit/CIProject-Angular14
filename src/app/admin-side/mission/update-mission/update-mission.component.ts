import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { City } from 'src/app/model/cms.model';
import { AdminsideServiceService } from 'src/app/service/adminside-service.service';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css']
})
export class UpdateMissionComponent implements OnInit {
  missionId:any;
  editData:any;
  editMissionForm:FormGroup;
  formValid:boolean;
  countryList:any[]=[];
  cityList:any[]=[];
  imageUrl:any = '';
  missionImage : any='';
  isFileUpload = false;
  formData = new FormData();
  missionThemes = ["A Church in Every Nation","A Clear and Compelling Call","A Heart for the Harvest","A Time for True Freedom","A Vision of the Harvest","A Waiting World - a Willing Church?",
  "Across the Street - Across the Sea","An Open Door","Approved to Proclaim (1 Thes. 2:4)","Are We There Yet?","Arise, Go, Preach (Jonah 3:2)","Around the Community, Around the World"]
  missionSkills = ["Gym Leader","Elite Four","Champion","Main Character","Rival","Villain","Trial Giver","Battle Facility Foe","Scarf","Seasonal Outfit","Special Costume","Sunglasses","Sygna Suit"]
  missionAvilabilitys = ["missionAvilability1","missionAvilability2","missionAvilability3","missionAvilability4","missionAvilability5"]
  constructor(public fb:FormBuilder,public service:AdminsideServiceService,public toastr:ToastrService,public router:Router,public activateRoute:ActivatedRoute,public datePipe:DatePipe
    ,private toast:NgToastService) {
    this.missionId = this.activateRoute.snapshot.paramMap.get("Id");
    if(this.missionId != 0)
    {
      this.FetchDetail(this.missionId);
    }
   }

  ngOnInit(): void {
    this.CountryList();
  }

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

  FetchDetail(id:any)
  {
      this.service.MissionDetailById(id).subscribe((data:any)=>{
          this.editData = data.data;
          let startDateformat = this.datePipe.transform(this.editData.startDate,"yyyy-MM-dd");
          this.editData.startDate = startDateformat;
          let endDateformat = this.datePipe.transform(this.editData.endDate,"yyyy-MM-dd");
          this.editData.endDate = endDateformat;
          let registrationDeadLineDateformat = this.datePipe.transform(this.editData.registrationDeadLine,"yyyy-MM-dd");
          this.editData.registrationDeadLine = registrationDeadLineDateformat;
          this.editMissionForm = this.fb.group({
              id:[this.editData.id],
              missionTitle:[this.editData.missionTitle,Validators.compose([Validators.required])],
              missionDescription:[this.editData.missionDescription,Validators.compose([Validators.required])],
              missionOrganisationName:[this.editData.missionOrganisationName,Validators.compose([Validators.required])],
              missionOrganisationDetail:[this.editData.missionOrganisationDetail,Validators.compose([Validators.required])],
              countryId:[this.editData.countryId,Validators.compose([Validators.required])],
              cityId:[this.editData.cityId,Validators.compose([Validators.required])],
              startDate:[this.editData.startDate,Validators.compose([Validators.required])],
              endDate:[this.editData.endDate,Validators.compose([Validators.required])],
              totalSheets:[this.editData.totalSheets,Validators.compose([Validators.required])],
              registrationDeadLine:[this.editData.registrationDeadLine,Validators.compose([Validators.required])],
              missionTheme:[this.editData.missionTheme,Validators.compose([Validators.required])],
              missionSkill:[this.editData.missionSkill,Validators.compose([Validators.required])],
              missionImages:[''],
              missionDocuments:[null],
              missionAvilability:[this.editData.missionAvilability,Validators.compose([Validators.required])]
          });
          this.service.CityList(this.editData.countryId).subscribe((data:any)=>{
                this.cityList = data.data;
          });
          if(this.editData.missionImages){
            this.imageUrl = this.service.imageUrl + '/' + this.editData.missionImages
          }
      });
  }
  get countryId() { return this.editMissionForm.get('countryId') as FormControl; }
  get cityId() { return this.editMissionForm.get('cityId') as FormControl; }
  get missionTitle() { return this.editMissionForm.get('missionTitle') as FormControl; }
  get missionOrganisationName() { return this.editMissionForm.get('missionOrganisationName') as FormControl; }
  get missionDescription() { return this.editMissionForm.get('missionDescription') as FormControl; }
  get missionOrganisationDetail() { return this.editMissionForm.get('missionOrganisationDetail') as FormControl; }
  get startDate() { return this.editMissionForm.get('startDate') as FormControl; }
  get endDate() { return this.editMissionForm.get('endDate') as FormControl; }
  get totalSheets() { return this.editMissionForm.get('totalSheets') as FormControl; }
  get registrationDeadLine() { return this.editMissionForm.get('registrationDeadLine') as FormControl; }
  get missionTheme() { return this.editMissionForm.get('missionTheme') as FormControl; }
  get missionSkill() { return this.editMissionForm.get('missionSkill') as FormControl; }
  get missionImages() { return this.editMissionForm.get('missionImages') as FormControl; }
  get missionDocuments() { return this.editMissionForm.get('missionDocuments') as FormControl; }
  get missionAvilability() { return this.editMissionForm.get('missionAvilability') as FormControl; }


  OnSelectedImage(event:any){
    if(event.target.files && event.target.files[0])
    {
      this.formData = new FormData();
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload =(e:any)=>{
          this.imageUrl = e.target.result;
      }

      for(let i=0;i<event.target.files.length;i++)
      {
          this.formData.append('file',event.target.files[i]);
          this.formData.append('moduleName','Mission');
      }
      this.isFileUpload = true;
    }
}
async OnSubmit(){
  this.formValid = true;
  let value = this.editMissionForm.value;
  let updateImageUrl = '';
  if(this.editMissionForm.valid)
  {
    if(this.isFileUpload){
      await this.service.UploadImage(this.formData).pipe().toPromise().then((res:any)=>{
        if(res.success){
          updateImageUrl = res.data;
        }
      },err=>this.toast.error({detail:"ERROR",summary:err.error.message}));
    }
    if(this.isFileUpload)
    {
      value.missionImages = updateImageUrl;
    }
    else
    {
      value.missionImages = this.editData.missionImages;
    }
    this.service.UpdateMission(value).subscribe((data:any)=>{
          if(data.result == 1)
          {
            //this.toastr.success(data.data);
            this.toast.success({detail:"SUCCESS",summary:data.data,duration:3000});
            setTimeout(() => {
              this.router.navigate(['admin/mission']);
            }, 1000);
          }
          else
          {
            this.toastr.error(data.message);
           // this.toast.error({detail:"ERROR",summary:data.message,duration:3000});
          }
    },err=>this.toast.error({detail:"ERROR",summary:err.error.message,duration:3000}));
  }
}
  OnCancel()
  {
    this.router.navigateByUrl('admin/mission');
  }
}
