import { NgModule } from '@angular/core';
import {SharedModule} from "../../../shared";


import { ProfileHomeComponent } from './profile-home.component';
import {ProfileHomeRoutingModule} from "./profile-home-routing.module";
import {AddressModule} from "../../../shared/component/address/address.module";

@NgModule({
  imports: [SharedModule,ProfileHomeRoutingModule,AddressModule],
  declarations: [ProfileHomeComponent]


})
export class ProfileHomeModule { }
