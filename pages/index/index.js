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
    newData:[]
  },
  onLoad(){
    this.newList()
    this.setData({
      newData:[1525]
    })
  },
  newList(){
    let that=this
    wx.request({
      url:urlList.newList,
      method:'get',
      success:function(res){
        // console.log(res)
        if(res.data.code==200){
          that.setData({
            newData:res.data.pojo.entryList
          })
          // console.log(that.data.newData)
        }
      }
    })
  },
  navigators(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../newdetail/newdetail?id='+id+''
    })
  }
})
