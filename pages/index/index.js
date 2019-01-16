//index.js
//获取应用实例
const app = getApp()
const urlList=require('../../config')

Page({
  data: {
    imgUrls: ['../../img/banner01.jpg', '../../img/banner02.jpg','../../img/banner03.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indicatorActiveColor:"#2db5a3",
    circular:true,
    newImg:['../../img/newlist01.jpg','../../img/newlist01.jpg','../../img/newlist01.jpg','../../img/newlist01.jpg']
  },
  onLoad(){
    this.newList()
  },
  newList(){
    wx.request({
      url:urlList.newList,
      method:'get',
      success:function(res){
        console.log(res)
      }
    })
  }
})
