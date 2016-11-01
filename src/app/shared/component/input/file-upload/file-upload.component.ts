import {Component, OnInit, OnDestroy, EventEmitter,Input, Output} from '@angular/core';
import {Subscription, BehaviorSubject} from "rxjs";


import {UploadService} from "./upload.service";
import {ImageService} from "./image.service";

import {Convert} from "../../../../core";


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit,OnDestroy {

  private uploadErrMsg: string;
  private waitUpload: boolean = false;   // 是否显示等待上传的icon
  private _startUpload:boolean=false;  //用户图片预览已经显示，点击 提交后的  显示等待的 状态
  private uploadSub: Subscription;
  private base64file: string;

  private _showUpload=new BehaviorSubject(false);

  private _image = new BehaviorSubject('');

  constructor(private convert: Convert, private uploadService: UploadService,
              private imageService: ImageService) {
  }

  //上传按钮上面的 value
  @Input() buttonValue: string;

  @Input() acceptType: string;

  @Input() maxSize: number;      //能够接受的最大的 上传文件的 大小

  @Input() minResizeSize: number;  //resize 处理的，最小的文件大小

  @Input() saveUrl: string;  //图片默认的保存地址。

  @Input() resizeDimension: Object;  //图片需要resize 后的像素，宽度，高度。

  @Output() uploadComplete = new EventEmitter<Object>();  //上传完成后，发出的 消息



  ngOnInit(): void {

  }


  changeEvent(event): void {

    const file = event.target.files[0];
    if (file) {
      this.waitUpload = true;
      this.uploadErrMsg = undefined;
      if (this.uploadService.isImg(file.type) &&
        file.size < this.maxSize) {
        let reader = new FileReader();
        const image: HTMLImageElement = document.createElement('img');
        reader.onloadend = ()=> {
          this.waitUpload = true;
          image.src = reader.result;
          //图片大于minResizeSize ,才做resize 处理
          if (file.size > this.minResizeSize) {
            const i = {
              width: 200,
              height: 250
            };
            this.imageService.resizeStep(image, this.resizeDimension['width'],
              this.resizeDimension['height'])
              .subscribe(
                e=> {
                  if(e=='fail'){
                    this.uploadErrMsg = '文件未选择成功，请重试!';
                    this.waitUpload = false;
                    this._showUpload.next(false);
                  }

                  else if(e&&e.startsWith('data:image/png;base64')){
                    console.log('上传成功');
                    this.waitUpload = false;
                    const m = {
                      status: true,
                      content: e
                    };
                    this.uploadComplete.emit(m);
                    this._image.next(e);
                    setTimeout(()=>{
                      this._showUpload.next(true);
                    },1000);

                    this.base64file = e;
                  }

                },
                err=> {
                  const m = {
                    status: false
                  };
                  this.uploadComplete.emit(m);
                  this.waitUpload = false;
                }
              )
          }
          //不做图片压缩处理的情形
          else {
            const m = {
              status: true,
              content: reader.result
            };
            this._image.next(reader.result);
            this.uploadComplete.emit(m);
            this.waitUpload = false;
            this.base64file = reader.result;
            this._showUpload.next(true);
          }
        };

        reader.readAsDataURL(file);
        this.uploadErrMsg = null;

      }
      else if (file.size >= this.maxSize) {
        this.uploadErrMsg = `图片不能超过${this.maxSize/1024} kb`;
        const m = {
          status: false
        };
        this.uploadComplete.emit(m);
        this.waitUpload = false;
      }
      else if (!this.uploadService.isImg(file.type)) {
        this.uploadErrMsg = "图片格式必需为'jpg','jpeg','png','gif'";
        const m = {
          status: false
        };
        this.uploadComplete.emit(m);
        this.waitUpload = false;
      }
    }
    else {
      const m = {
        status: false
      };
      this.uploadComplete.emit(m);
      this.waitUpload = false;
    }

  }


  //开始上传文件

  uploadFile()
  {
    if(this.saveUrl){
      this._startUpload = true;
      const file = this.convert.dataURItoFile(this.base64file);
      console.log('resize 后,文件大小为: ' + file.size / 1024 + 'Kb');

      if (file) {
        this.uploadSub = this.uploadService.upload(this.saveUrl, file)
          .subscribe(e=> {
            if (e && e.data) {
              if (e.data.hasOwnProperty('result')) {
                this._startUpload = false;
                console.log('文件上传成功。');

                this.afterUpload('文件上传成功!')
              }
            }

          }, err=> {
            //上传失败
            this.uploadErrMsg = '上传失败,请稍后再试!';
            this._startUpload = false;

          })
      }
    }

  }

  showUpload(){
    return this._showUpload;
  }

  startUpload()
  {
    return this._startUpload;
  }

  getImage()
  {
    return this._image;
  }

  // 用户点击，取消上传 按钮粗发的事件，，恢复到服务器保存的的图片，将这条消息告诉前台。
  cancelUpload()
  {
    const m = {
      cancel: true
    };
    this.uploadComplete.emit(m);
    this._showUpload.next(false);
    this.uploadErrMsg=undefined;
  }

  ngOnDestroy()
  {
    if (typeof this.uploadSub!=='undefined') {
      this.uploadSub.unsubscribe();
    }
  }


  //文件上传之后的 显示 成功还是失败的消息提醒。

  private afterUpload(msg: string) {
    this.uploadErrMsg = msg;
    setTimeout(()=> {
      this._showUpload.next(false);
      this.uploadErrMsg = undefined;
    }, 2500)
  }

}
