import { Component, OnInit,Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-birthday',
  templateUrl: './edit-birthday.component.html',
  styleUrls: ['./edit-birthday.component.css']
})
export class EditBirthdayComponent implements OnInit {

  private showReadOnly: boolean = false;  //当用户修改完生日后,如果用户输入的信息验证通过,那么将 显示 这个只读,然后要求用户输入密码
  private newBirthdayValue: string; //生日修改后的,值 －－当用户在MonthDateComponent 修改完生日后，显示的新的生日。

  private needSavedBirthdayObject:Object={};
  private showBirthdayInput:boolean=true;
  constructor(){}

  //将 用户的生日信息，传递给这个组件。是string类型的 iso格式
  @Input() content: string;

  ngOnInit() {
  }


  //当 用户在  MonthDateComponent  提交了，string iso 'YYYY-MM-DD HH:mm:ss' string
  afterModifiedBirthday(event:string){
    if(event){
      console.log(event);
      this.showReadOnly=true;
      this.newBirthdayValue =event ;
      this.needSavedBirthdayObject['birthday']=event;
    }
  }


  //当需要密码验证,且信息更改成功后,前台收到的信息提示

  needPasswordChangeBirthdaySuccess(status: boolean|Object) {
    if (typeof status=='boolean'&&status) {
      console.log(status);
      this.showReadOnly= false;
      this.content['birthday']=this.newBirthdayValue;
    }

  }



  //当需要密码验证,用户取消输入密码的时候,的事件
  cancelInputPasswordBirthday(status:boolean) {
    if (status) {
      this.showReadOnly = false;
    }
  }

  cancelEdit(event){
    if(event){

      console.log('cancel edit birthday')
      this.showBirthdayInput=true;
    }
  }


}
