/**
 * @Description : 此class 用在 url 排序的时候，例如：url?sort=field1,asc&sort=field2,desc
 * @date : 2016/10/25 下午7:19
 * @author : keryHu keryhu@hotmail.com
 */


export class Sort{


  constructor(public property: string,public direction: string){}

  static parse(value:string):Array<Sort>{
    const split=value.split(',');
    let t=[];
    for(let i=0;i<split.length;i=i+2){
      t.push(new Sort(split[i],split[i+1]));
    }
    return t;
  }


  toString(){
    return `${this.property},${this.direction}`;
  }
}
