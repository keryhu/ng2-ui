/**
 * @Description : please enter the description
 * @date : 16/8/27 下午5:30
 * @author : keryHu keryhu@hotmail.com
 */

import {Injectable} from "@angular/core";

@Injectable()
export class Convert{

  constructor(){}



  // 将base64,image 转为 img file
  dataURItoFile(dataURI:string):File{
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = decodeURI(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const f=new Blob([ia], {type:mimeString});
    return  <File>f;
  }


  // 将 object 转为   url 后面的query param
  serializeToQueryParam(obj):string{
    let str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }



}
