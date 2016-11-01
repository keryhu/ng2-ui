import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "@angular/material";
import {NeedPasswordModule,AccountActivateModule} from "../../account";

import { EditTextComponent } from './edit-text.component';
import {TextEditModule} from "../../inline-edit";
import {EditTextService} from "./edit-text.service";


@NgModule({
  imports: [CommonModule,TextEditModule,NeedPasswordModule,AccountActivateModule,
    MaterialModule.forRoot()],
  declarations: [EditTextComponent],
  providers: [EditTextService],
  exports: [EditTextComponent]
})
export class EditTextModule { }
