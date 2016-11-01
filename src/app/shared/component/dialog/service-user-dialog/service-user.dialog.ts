import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-service-user-dialog',
  templateUrl: 'service-user.dialog.html',
  styleUrls: ['service-user.dialog.css']
})
export class ServiceUserDialog implements OnInit {

  constructor(public dialogRef: MdDialogRef<ServiceUserDialog>) { }

  ngOnInit() {
  }

}
