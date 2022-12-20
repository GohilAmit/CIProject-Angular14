import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import { City, CMS, Country, Mission } from '../model/cms.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Story } from '../model/story.model';
import { UserDetail } from '../model/user.model';
import { THRESHOLD_DIFF } from '@progress/kendo-angular-popup/services/scrollable.service';
import { MissionApplication } from '../model/missionApplication.model';
@Injectable({
  providedIn: 'root'
})
export class AdminsideServiceService {

  constructor(public http:HttpClient,public toastr:ToastrService,public router:Router) { }
  // apiUrl:string='http://localhost:63943/api';
  apiUrl:string='http://localhost:56577/api';
  imageUrl:string='http://localhost:56577';


  //User
  UserList():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/AdminUser/UserDetailList`);
  }
  DeleteUser(userId:any){
      return this.http.delete(`${this.apiUrl}/AdminUser/DeleteUserAndUserDetail/${userId}`);
  }

  //CMS
  CMSList():Observable<CMS[]>{
    return this.http.get<CMS[]>(`${this.apiUrl}/CMS/CMSList`);
  }
  CMSDetailById(id:number):Observable<CMS[]>{
    return this.http.get<CMS[]>(`${this.apiUrl}/CMS/CMSDetailById/${id}`);
  }
  AddCMS(data:CMS){
    return this.http.post(`${this.apiUrl}/CMS/AddCMS`,data,{responseType:'json'});
  }
  UpdateCMS(data:CMS){
    return this.http.post(`${this.apiUrl}/CMS/UpdateCMS`,data);
  }
  DeleteCMS(data:any){
    return this.http.delete(`${this.apiUrl}/CMS/DeleteCMS/${data}`);
  }

  //Mission
  UploadImage(data:any)
  {
    return this.http.post(`${this.apiUrl}/Mission/UploadImage`,data);
  }
  MissionList():Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiUrl}/Mission/MissionList`);
  }
  MissionDetailById(id:number):Observable<Mission[]>{
    return this.http.get<Mission[]>(`${this.apiUrl}/Mission/MissionDetailById/${id}`);
  }
  CountryList():Observable<Country[]>{
    return this.http.get<Country[]>(`${this.apiUrl}/Common/CountryList`);
  }
  CityList(countryId:any):Observable<City[]>{
    return this.http.get<City[]>(`${this.apiUrl}/Common/CityList/${countryId}`);
  }
  AddMission(data:Mission){
    return this.http.post(`${this.apiUrl}/Mission/AddMission`,data);
  }
  UpdateMission(data:Mission){
    return this.http.post(`${this.apiUrl}/Mission/UpdateMission`,data);
  }
  DeleteMission(data:any){
    return this.http.delete(`${this.apiUrl}/Mission/DeleteMission/${data}`);
  }


  //Story
  StoryList():Observable<Story[]>{
    return this.http.get<Story[]>(`${this.apiUrl}/Story/AdminSideStoryList`);
  }
  UpdaeStorySatus(data:Story){
    return this.http.post(`${this.apiUrl}/Story/StoryStatusActive`,data);
  }
  DeleteStory(data:any){
    return this.http.delete(`${this.apiUrl}/Story/DeleteStory/${data}`);
  }

  StoryDetail(id:number):Observable<Story[]>{
    return this.http.get<Story[]>(`${this.apiUrl}/Story/StoryDetailByIdAdmin/${id}`);
  }

  //Mission Application
  MissionApplicationList():Observable<MissionApplication[]>{
    return this.http.get<MissionApplication[]>(`${this.apiUrl}/Mission/MissionApplicationList`);
  }
}
