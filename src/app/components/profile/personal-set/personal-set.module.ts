import { NgModule } from '@angular/core';
import {MaterialModule} from "@angular/material";


import {SharedModule,FileUploadModule,EditTextModule,
  EditBirthdayModule,ChangePasswordModule} from "../../../shared";


import { PersonalSetComponent } from './personal-set.component';
import {PersonalSetRoutingModule} from "./personal-set-routing.module";
import {PersonalSetService} from "./personal-set.service";
import {PersonalSetResolve} from "./personal-set-resolve.service";




@NgModule({
  imports: [SharedModule,PersonalSetRoutingModule,FileUploadModule,
    ChangePasswordModule,EditBirthdayModule,EditTextModule,
    MaterialModule.forRoot()],
  declarations: [PersonalSetComponent],
  providers: [PersonalSetService,PersonalSetResolve]

})
export class PersonalSetModule { }
