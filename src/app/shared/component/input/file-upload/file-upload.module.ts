import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {MaterialModule} from "@angular/material";

import {FileUploadComponent} from './file-upload.component';
import {UploadService} from "./upload.service";
import {ImageService} from "./image.service";


@NgModule({
  imports: [CommonModule,MaterialModule.forRoot()],
  providers: [ImageService, UploadService],
  declarations: [FileUploadComponent],
  exports: [FileUploadComponent]
})
export class FileUploadModule {
}
