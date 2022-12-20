import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './LoginRegister/login/login.component';
import { RegisterComponent } from './LoginRegister/register/register.component';
import { ForgotPasswordComponent } from './LoginRegister/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './LoginRegister/reset-password/reset-password.component';
import { NavbarComponent } from './NavBar/navbar/navbar.component';
import { SearchinSortingComponent } from './NavBar/searchin-sorting/searchin-sorting.component';
import { HomeComponent } from './NavBar/home/home.component';
import { FooterComponent } from './NavBar/footer/footer.component';
import { NewMissionComponent } from './new-mission/new-mission.component';
import { VolunVolunteeringMissionComponent } from './volun-volunteering-mission/volun-volunteering-mission.component';
import { StoriesListingComponent } from './stories-listing/stories-listing.component';
import { ShareyourstoryComponent } from './shareyourstory/shareyourstory.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { UsereditprofileComponent } from './usereditprofile/usereditprofile.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { MenuComponent } from 'ngx-editor';
import { VolunteeringTimesheetComponent } from './volunteering-timesheet/volunteering-timesheet.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  // {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'resetPassword',component:ResetPasswordComponent},
  {path:'',component:HomeComponent},
  {path:'addNewMission',component:NewMissionComponent},
  {path:'volunteeringMission',component:VolunVolunteeringMissionComponent},
  {path:'storiesListing',component:StoriesListingComponent},
  {path:'shareyourstory',component:ShareyourstoryComponent,canActivate:[AuthGuard]},
  {path:'storyDetail/:Id',component:StoryDetailComponent},
  {path:'userProfile/:userId',component:UsereditprofileComponent,canActivate:[AuthGuard]},
  {path:'privacyPolicy',component:PrivacyPolicyComponent},
  {path:'volunteeringTimesheet',component:VolunteeringTimesheetComponent,canActivate:[AuthGuard]},
  {path:'admin',loadChildren:()=>import('./admin-side/admin-side.module').then(mod => mod.AdminSideModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
