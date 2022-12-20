import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  missionThemes = ["A Church in Every Nation","A Clear and Compelling Call","A Heart for the Harvest","A Time for True Freedom","A Vision of the Harvest","A Waiting World - a Willing Church?",
  "Across the Street - Across the Sea","An Open Door","Approved to Proclaim (1 Thes. 2:4)","Are We There Yet?","Arise, Go, Preach (Jonah 3:2)","Around the Community, Around the World"]
  missionSkills = ["Gym Leader","Elite Four","Champion","Main Character","Rival","Villain","Trial Giver","Battle Facility Foe","Scarf","Seasonal Outfit","Special Costume","Sunglasses","Sygna Suit"]
  missionAvilabilitys = ["missionAvilability1","missionAvilability2","missionAvilability3","missionAvilability4","missionAvilability5"]
  constructor(public fb:FormBuilder,public service:AdminsideServiceService,public toastr:ToastrService,public router:Router,public datePipe:DatePipe,private toast:NgToastService) { }

  ngOnInit(): void {
    this.addMissionFormValid();
    this.CountryList();
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
          totalSheets : [null,Validators.compose([Validators.required])],
          registrationDeadLine : [null,Validators.compose([Validators.required])],
          missionTheme : [null,Validators.compose([Validators.required])],
          missionSkill : [null,Validators.compose([Validators.required])],
          missionImages : [null,Validators.compose([Validators.required])],
          missionDocuments : [null],
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
  get totalSheets() { return this.addMissionForm.get('totalSheets') as FormControl; }
  get registrationDeadLine() { return this.addMissionForm.get('registrationDeadLine') as FormControl; }
  get missionTheme() { return this.addMissionForm.get('missionTheme') as FormControl; }
  get missionSkill() { return this.addMissionForm.get('missionSkill') as FormControl; }
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
  missionImage : any='';
  isFileUpload = true;
  formData = new FormData();
  OnSelectedImage(event:any){
      if(event.target.files && event.target.files[0])
      {
        this.formData = new FormData();
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload =(e:any)=>{
            this.missionImage = e.target.result;
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
    let imageUrl = '';
    let value = this.addMissionForm.value;

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
      value.missionImages = imageUrl;
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
          this.toastr.error(data.message);
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

}

