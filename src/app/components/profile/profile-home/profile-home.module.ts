import { NgModule } from '@angular/core';
import {SharedModule} from "../../../shared";


import { ProfileHomeComponent } from './profile-home.component';
import {ProfileHomeRoutingModule} from "./profile-home-routing.module";

@NgModule({
  imports: [SharedModule,ProfileHomeRoutingModule],
  declarations: [ProfileHomeComponent]


})
export class ProfileHomeModule { }
