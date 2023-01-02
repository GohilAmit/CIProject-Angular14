import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSideRoutingModule } from './admin-side-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { CMSListComponent } from './CMS/cmslist/cmslist.component';
import { CMSAddComponent } from './CMS/cmsadd/cmsadd.component';
import { CMSEditComponent } from './CMS/cmsedit/cmsedit.component';
import { MissionComponent } from './mission/mission.component';
import { MissionApplicationComponent } from './mission-application/mission-application.component';
import { StoryComponent } from './story/story.component';
import { MissionthemeComponent } from './missiontheme/missiontheme.component';
import { MissionskillComponent } from './missionskill/missionskill.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { EditorModule } from '@progress/kendo-angular-editor';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from './CustomPipe/filter.pipe';
import { BannerManagementComponent } from './banner-management/banner-management.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AddMissionComponent } from './mission/add-mission/add-mission.component';
import { UpdateMissionComponent } from './mission/update-mission/update-mission.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from '../Interceptors/token.interceptor';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { AddMissionThemeComponent } from './missiontheme/add-mission-theme/add-mission-theme.component';
import { AddMissionSkillComponent } from './missionskill/add-mission-skill/add-mission-skill.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    CMSListComponent,
    CMSAddComponent,
    CMSEditComponent,
    MissionComponent,
    MissionApplicationComponent,
    StoryComponent,
    MissionthemeComponent,
    MissionskillComponent,
    SidebarComponent,
    HeaderComponent,
    FilterPipe,
    BannerManagementComponent,
    AddMissionComponent,
    UpdateMissionComponent,
    AddMissionThemeComponent,
    AddMissionSkillComponent

  ],
  imports: [
    CommonModule,
    AdminSideRoutingModule,
    EditorModule,
    ToolBarModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    HttpClientModule,
    NgToastModule,
    NgxGalleryModule
  ],
  providers:[DatePipe,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }]
})
export class AdminSideModule { }
