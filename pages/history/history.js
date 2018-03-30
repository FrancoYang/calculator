// pages/history/history.js
Page({
 data:{
   exprs:[]
 },
 onLoad(options){
    this.setData({
      exprs:wx.getStorageSync("exprs")||[]
    })
 }
})