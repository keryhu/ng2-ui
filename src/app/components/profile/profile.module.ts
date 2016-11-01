import { NgModule } from '@angular/core';

import {SharedModule} from "../../shared";
import {MaterialModule} from "@angular/material";

import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";


@NgModule({
  imports: [SharedModule, ProfileRoutingModule,MaterialModule.forRoot()],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
