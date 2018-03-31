//index.js
//封装一个计算的函数
var calculate = function (data1, oper, data2) {
  var data;
  data1 = parseFloat(data1);
  data2 = parseFloat(data2);
  switch (oper) {
    case "+":
      data = data1 + data2;
      break;
    case "-":
      data = data1 - data2;
      break;
    case "*":
      data = data1 * data2;
      break;
    case "/":
      if (data2 !== 0) {
        data = data1 / data2;
      } else {
        data = 0;
      }
      break;
  }
  return data;
}

//封装一个把所有数据保存到本地缓存数组的函数
var saveExprs=function(expr){
  var exprs=wx.getStorageSync("exprs")||[];
  exprs.unshift(expr);
  wx.setStorageSync("exprs",exprs)
}


Page({
  data:{
    id1:"clear",  //清除所有
    id2:"back",   //回退一个
    id3:"history",  //历史
    id4:"div",
    id5:"num_7",
    id6:"num_8",
    id7:"num_9",
    id8:"mul",  //乘
    id9:"num_4",
    id10:"num_5",
    id11:"num_6",
    id12:"sub",  //减
    id13:"num_1",
    id14:"num_2",
    id15:"num_3",
    id16:"add",  //加
    id17:"num_0",
    id18:"dot",  //小数点
    id19:"equals",
    result:"0",  //计算结果
    lastoper:"+",  //上一次的操作符
    temp:"0",  //临时结果
    flag:true,  //上一按钮是非数字按钮
    record:true,  //计算过程保存到历史记录中
    expr:""  //计算表达式
  },
  
  clickButton(e){
    var data=this.data.result;
    //获取上一次的结果值
    var tmp=this.data.temp;
    //获取上一次的临时结果
    var lastoper1=this.data.lastoper;
    //获取上一次的运算符
    var noNumFlag=this.data.flag;
    //获取上一次的非数字按钮标志
    var expr1=this.data.expr;
    //获取前面的表达式

    //判断是否是按了数字键
    if(e.target.id>="num_0" && e.target.id<="num_9"){
      data+=e.target.id.split("_")[1];

      //以上是正常情况，串接输入的数字

      //以下是如果原值为0或者非数字键,则用输入的值替代,注意这里有个例外，如果上次是点的话，要像数字那样拼接的
      if(this.data.result=="0"||noNumFlag){
        data=e.target.id.split("_")[1];
      }
      noNumFlag = false;
    }else{
      //如果不是按的数字
      noNumFlag=true;
      //如果输入的是小数点
      if(e.target.id=="dot"){
        //如果之前的值里面不含小数点才执行
        if(data.toString().indexOf(".")==-1){
          data+=".";
          noNumFlag = false;
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
      }else if(e.target.id=="history"){
        //跳转到history页面
        wx.navigateTo({
          url: '../history/history'
        })
      }else if(e.target.id=="div"){
        expr1+=data.toString()+"/";  //生成表达式
        data=calculate(tmp,lastoper1,data);
        tmp=data;
        lastoper1="/";
      } else if(e.target.id == "mul"){
        expr1 += data.toString() + "*";  //生成表达式
        data = calculate(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "*";
      } else if(e.target.id == "add"){
        expr1 += data.toString() + "+";  //生成表达式
        data = calculate(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "+";
      } else if(e.target.id == "sub"){
        expr1 += data.toString() + "-";  //生成表达式
        data = calculate(tmp, lastoper1, data);
        tmp = data;
        lastoper1 = "-";
      } else if(e.target.id == "equals"){
        expr1 += data.toString();  
        data = calculate(tmp, lastoper1, data);
        expr1 += "=" + data;  ////生成表达式

        if(this.data.record){
          saveExprs(expr1); //如果启用了保存历史的功能，调用函数保存到本地缓存
        }
        
        expr1="";
        tmp = 0;
        lastoper1 = "+";
      }
      
    }
  // 最后更新值
  this.setData({
    result:data,
    lastoper:lastoper1,
    temp:tmp,
    flag:noNumFlag,
    expr:expr1
  })

  },

  //更改历史记录标志
  recordHistory(e){
    this.setData({
      record:e.detail.value
    })
  }
})


