import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

import { AddressComponent } from './address.component';
import {AddressService} from "./address.service";

@NgModule({
  imports: [CommonModule,ReactiveFormsModule],
  declarations: [AddressComponent],
  providers: [AddressService],
  exports: [AddressComponent]
})
export class AddressModule { }
