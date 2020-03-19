import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './homepage/homepage.component';
import { ProfilepageComponent } from './profilepage/profilepage.component';
import { CreatetestComponent } from './createtest/createtest.component';
import { StarttestComponent } from './starttest/starttest.component';


const routes: Routes = [
  {
    path:'profilepage',
    component:ProfilepageComponent
  },
  {
    path:'homepage',
    component:HomePageComponent
  },

  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'createtest',
    component:CreatetestComponent
  },
  {
    path:'starttest',
    component:StarttestComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
