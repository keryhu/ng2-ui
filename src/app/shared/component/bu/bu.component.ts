import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-bu',
  templateUrl: 'bu.component.html',
  styleUrls: ['bu.component.css']
})
export class BuComponent implements OnInit {

  //private form: FormGroup;
 // password = new FormControl('');

  private showContent:boolean=true;

  private name:string;

  constructor() { }

  ngOnInit() {
    //this.form = new FormGroup({password: this.password});
  }

  cancelContent(){
    this.showContent=false;
  }

  cancelForm(){
    this.showContent=true;
  }


}
