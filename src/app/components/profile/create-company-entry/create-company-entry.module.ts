import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CreateCompanyEntryComponent } from './create-company-entry.component';
import {CreateCompanyEntryRoutingModule} from "./create-company-entry-routing.module";

@NgModule({
  imports: [CommonModule,CreateCompanyEntryRoutingModule],
  declarations: [CreateCompanyEntryComponent]
})
export class CreateCompanyEntryModule { }
