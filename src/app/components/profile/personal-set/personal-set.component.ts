import {ActivatedRoute} from "@angular/router";
import {Component, OnInit,} from "@angular/core";
import {BehaviorSubject} from "rxjs";


import {SpinnerService,Constant} from "../../../core";

export interface PersonalEditInfo {
  userId:string;
  name:string;
  email:string;
  phone:string;
  birthday:string;
  headerBase64?:string;
  useDefaultHeaderImg:boolean;    //是否使用的是默认的头像
  nameCanModify:boolean;
  nameModifyTime?:string;   //上次姓名修改的时间点
}


@Component({
  selector: 'app-personal-set',
  templateUrl: './personal-set.component.html',
  styleUrls: ['./personal-set.component.css']
})
export class PersonalSetComponent implements OnInit {
  private personalEditInfo: PersonalEditInfo;

  private uploadbuttonValue:string;
  private _userHeader=new BehaviorSubject('');

  private nameObject:Object;
  private phoneObject:Object;
  private emailObject:Object;
  private birthdayObject:Object;

  //能够接受的上传文件的格式。
  private acceptType:string='image/*';
  private maxSize:number=4 * 1024 * 1024;  //最大4Mb的图片
  private minResizeSize: number=200 * 1024;  //resize 处理的，最小的文件大小、
  private imageSaveUrl=Constant.personalEditHeaderImgUrl;
  private resizeDimension={
    width: 200,
    height: 250
  };  //图片需要resize 后的像素，宽度，高度。
  // 上面是传递给  file upload 组件的属性


  constructor( private route: ActivatedRoute,private spinner: SpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.stop();
    this.personalEditInfo = this.route.snapshot.data['personalSet'];
    this._userHeader.next(this.personalEditInfo.headerBase64);
    this.uploadbuttonValue=this.personalEditInfo.useDefaultHeaderImg?'上传头像':'更换头像';


    this.nameObject={
      name: this.personalEditInfo.name,
      nameCanModify:this.personalEditInfo.nameCanModify,
      nameModifyTime:this.personalEditInfo.nameModifyTime
    };
    this.emailObject={account: this.personalEditInfo.email};
    this.phoneObject={account: this.personalEditInfo.phone};

    console.log(this.personalEditInfo.birthday);

    this.birthdayObject={birthday:this.personalEditInfo.birthday};
  }


  // upload 组件传递过来的消息。

  uploadComplete(event){
    if(event&&event.status){
      if(event.content){
        this._userHeader.next(event.content);
      }
    }
    //如果用户，取消点击上传 按钮，则恢复到数据库保存的 图片。
    if(event&&event.cancel){
      console.log('cancel');
      this._userHeader.next(this.personalEditInfo.headerBase64);
    }
  }

  getImage(){
    return this._userHeader;
  }


}
