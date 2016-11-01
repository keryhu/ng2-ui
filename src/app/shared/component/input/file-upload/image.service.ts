/**
 * @Description : js 利用 lanczos-sinc 实现 图片的缩放。
 * @date : 16/8/31 下午3:18
 * @author : keryHu keryhu@hotmail.com
 */


import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs/Rx";
import {Convert} from "../../../../core";



@Injectable()
export class ImageService {

  constructor(private convert: Convert) {
  }

  private canvas = document.createElement('canvas');

  // step down 算法 ,
  public resizeStep(img, width, height, quality = 1.0): Observable<string> {
    console.log('原图片的宽为: ' + img.naturalWidth + ' , 高为: ' + img.naturalHeight);
    const convert = this.convert;
    const canvas = document.createElement('canvas');
    const context = this.getContext(canvas);
    const type = 'image/png';
    const _dataUrl = new BehaviorSubject('');
    let cW = img.naturalWidth;
    let cH = img.naturalHeight;
    let tmp = null;

    if(cW==0||cH==0){
      _dataUrl.next('fail');
      return _dataUrl;
    }

    function stepDown() {
      cW = Math.max(cW / 2, width) | 0;
      cH = Math.max(cH / 2, height) | 0;
      canvas.width = cW;
      canvas.height = cH;
      context.drawImage(tmp || img, 0, 0, cW, cH);
      const dataUrl = canvas.toDataURL(type, quality);

      if (cW <= width || cH <= height) {
        _dataUrl.next(dataUrl);
        const f = convert.dataURItoFile(dataUrl);
        console.log('resize 后,文件大小为: ' + f.size / 1024 + ' Kb');
        return _dataUrl;
      }
      if (!tmp) {
        tmp = new Image();
        tmp.onload = stepDown;
      }
      tmp.src = dataUrl;
    };

    if (cW <= width || cH <= height || cW / 2 < width || cH / 2 < height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL(type, quality);
      const f = convert.dataURItoFile(dataUrl);
      console.log('resize 后,文件大小为: ' + f.size / 1024 + ' Kb');
      _dataUrl.next(dataUrl);
    }
    else {
      stepDown();
    }
    return _dataUrl;
  }


  private getContext(canvas) {
    const context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;
    context.mozImageSmoothingEnabled = true;
    context.oImageSmoothingEnabled = true;
    return context;
  }


  // returns a function that calculates lanczos weight
  private lanczosGenerator(lobes) {
    const recLobes = 1.0 / lobes;
    return function (x) {
      if (x > lobes) return 0;
      x *= Math.PI;
      if (Math.abs(x) < 1e-16) return 1;
      var xx = x * recLobes;
      return Math.sin(x) * Math.sin(xx) / x / xx
    }
  }

}
