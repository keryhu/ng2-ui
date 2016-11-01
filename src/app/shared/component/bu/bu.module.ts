import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuComponent } from './bu.component';
import {MaterialModule} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule,MaterialModule.forRoot(),ReactiveFormsModule,FormsModule],
  declarations: [BuComponent],
  exports:[BuComponent]
})
export class BuModule { }
