//index.js
//获取应用实例
Page({
  data:{
    id1:"clear",
    id2:"back",
    id3:"history",
    id4:"div",
    id5:"num_7",
    id6:"num_8",
    id7:"num_9",
    id8:"mul",
    id9:"num_4",
    id10:"num_5",
    id11:"num_6",
    id12:"sub",
    id13:"num_1",
    id14:"num_2",
    id15:"num_3",
    id16:"add",
    id17:"num_0",
    id18:"dot",
    id19:"equals",
    result:"0",
    // dotSign:false
  },
  /*clickButton(e){
    var btnValue=e.target.id;
    var res=this.data.result;
    var newDotSign=this.data.dotSign;
    //处理数字部分的按键
    if(btnValue>="num_0"&&btnValue<="num_9"){
      var num=btnValue.split("_")[1];
      if(res=="0"||res.charAt(res.length-1)=="∞"){
        res=num;
      }else{
        res=res+num;
      }
    //处理非数字部分的按键
    }else{
      //处理小数点的按键
      if(btnValue=="dot"){
        if(!newDotSign){
          res=res+".";
          newDotSign=true;
        }
      //处理清除按键
      }else if(btnValue=="clear"){
        res="0";
        newDotSign=false;
      //处理清除按键
      }else if(btnValue=="back"){
        var length=res.length;
        if(length>1){
          res=res.substr(0,length-1); 
        }else{
          res="0";
        }
      //处理加减乘除按键
      }else if(btnValue=="add"||btnValue=="sub"||btnValue=="mul"||btnValue=="div"){
        newDotSign=false;
        var sign;
        switch(btnValue){
          case "add":
            sign="+";
            break;
          case "sub":
            sign = "-";
            break;
          case "mul":
            sign = "*";
            break;
          case "div":
            sign = "/";
            break; 
        }
        if(!isNaN(res.charAt(res.length-1))){
          res = res + sign;
        }
      }


    }
    this.setData({
      result:res,
      dotSign:newDotSign
    });
  },
  equals(){
    var str=this.data.result;
    var strArr=[];
    var item="";
    var temp=0;
    for(var i=0;i<=str.length;i++){
      var ch=str.charAt(i);
      if((ch!=""&&ch>=0&&ch<=9)||ch=="."){
        item=item+ch;
      }else{
        strArr[temp]=item;
        temp++;
        strArr[temp]=ch;
        temp++;
      }
    }
    if(isNaN(strArr[strArr.length-1])){
      strArr.pop();
    }
    var res=strArr[0]*1;
    var num;
    for(var i=1;i<strArr.length;i=i+2){
      if (res == "∞"){
        break;
      }
      num=strArr[i+1]*1;
      switch(strArr[i]){
        case "+":
          res=res+num;
          break;
        case "-":
          res = res-num;
          break;
        case "*":
          res = res*num;
          break;
        case "/":
          if(num!=0){
            res = res/num;
          }else{
            res="∞";
          }
          break;
      }
    }
    this.setData({
      result:"="+res
    });
  }*/
  clickButton(e){
    var data=this.data.result; //获取上一次的结果值
    var tmp=this.data.temp; //获取上一次的临时结果
    var lastoper1=this.data.lastoper; //获取上一次的运算符
    var noNumFlag=this.data.flag; //获取上一次的非数字按钮标志

    //判断是否是按了数字键
    if(e.target.id>="num_0"&&e.target.id<="num_9"){
      data+=e.target.id.split("_")[1];
      noNumFlag=false;
      //以上是正常情况，串接输入的数字
      //以下是如果原值为0或者非数字键,则用输入的值替代
      if(this.data.result=="0"||noNumFlag){
        data=e.target.id.split("_")[1];
      }

    }else{
      //如果不是按的数字
      noNumFlag=true;
      //如果输入的是小数点
      if(e.target.id=="dot"){
        //如果之前的值里面不含小数点才执行
        if(data.toString().indexOf(".")==-1){
          data+=".";
        }
      }else if(e.target.id=="clear"){
        //如果是清除按键则全部清零
        data=0;
        tmp=0;
        lastoper1="+";
      }else if(e.target.id=="back"){
        if(data.toString().length>1){
          //如果长度超过1位数,去掉最后一位,否则的话，直接变成0
          data=data.substr(0,data.toString().length-1);
        }else{
          data=0;
        }
      }else if(1){

      }else if(1){

      }else if(1){

      }else if(1){

      }else if(1){

      }
      
    }
  // 最后更新值
  this.setData({
    result:data,
    lastoper:lastoper1,
    temp:tmp,
    flag:noNumFlag
  })

  }
})
