import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-searchin-sorting',
  templateUrl: './searchin-sorting.component.html',
  styleUrls: ['./searchin-sorting.component.css']
})
export class SearchinSortingComponent implements OnInit {

  constructor(private service:CommonService,private toastr:ToastrService) { }
  missionCountryList:any[]=[];
  missionCityList:any[]=[];
  missionThemeList:any[]=[];
  missionSkillList:any[]=[];
  ngOnInit(): void {
    this.GetMissionCountryList();
    this.GetMissionCityList();
    this.GetMissionThemeList();
    this.GetMissionSkillList();
  }

  GetMissionCountryList(){
    this.service.GetMissionCountryList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionCountryList = data.data;
      }
      else{
          this.toastr.error(data.message);
      }
    });
  }
  GetMissionCityList(){
    this.service.GetMissionCityList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionCityList = data.data;
      }
      else
      {
        this.toastr.error(data.message);
      }
    });
  }
  GetMissionThemeList(){
    this.service.GetMissionThemeList().subscribe((data:any)=>{
      if(data.result == 1)
      {
        this.missionThemeList = data.data;
      }
      else
      {
        this.toastr.error(data.message);
      }
    });
  }
  GetMissionSkillList(){
    this.service.GetMissionSkillList().subscribe((data:any)=>{
        if(data.result == 1){
          this.missionSkillList = data.data;
        }
        else
        {
            this.toastr.error(data.message);
        }
    });
  }
  OnTextChange(text:any)
  {
    this.service.searchList.next(text);
  }
  Onchange(e:any){
    this.service.searchList.next(e.target.value);
  }
}
