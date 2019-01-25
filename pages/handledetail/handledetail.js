// pages/handledetail/handledetail.js
const urlList=require('../../config')
const citys= require('../../select')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cur:"",
    multiArray1:[],
    multiArray: [],
    multiIndex: [0, 0, 0],
    name:[],
    city:[],
    area:[]
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        this.changeCity(data.multiIndex[0])
        this.changeArea(data.multiIndex[0], 0)
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
        break
      case 1:
        this.changeArea(data.multiIndex[0], data.multiIndex[1]) 
        data.multiIndex[2] = 0
        break
    }
    this.setData(data);
  },

  // 请求城市列表
  saveUApply(){
    let that=this
    wx.request({
      url:'http://www.weaving-comm.com:8081/immediatelyHandle/front/getProvCityAreaByUserType.do',
      header:{'content-type':'application/x-www-form-urlencoded'},
      method:"post",
      data:{'userType':'personal'},
      success:function(res){
        // console.log(res.data.pojo)
        if(res.data.code==200){
          setTimeout(()=>{
            that.setData({
              multiArray1: citys
            })
            that.changeName()
            that.changeCity(0)
            that.changeArea(0, 0)
          },4000)
         
        }
      }
    })
  },

  // 初始化获取省份
  changeName(){
    const name=this.data.name=[]
    this.data.multiArray1.forEach(function(item,index){
      name.push(item.name)
    })
    this.setData({
      multiArray:[name,[],[]]
    })
  },

  // 初始化获取市区
  changeCity(index){
    let city = this.data.city=[]
    this.data.multiArray1[index].city.forEach(function(item){
        city.push(item.name)
    })
    this.setData({
      multiArray: [this.data.name, city,this.data.area]
    })
  },

  // 初始化获取县
  changeArea(indexName,indexCity){
    const area = this.data.area=[]
    this.data.multiArray1[indexName].city[indexCity].area.forEach(function(item){
        area.push(item)
    })
    this.setData({
      multiArray:[this.data.name,this.data.city,area]
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _cur:1
    })
    this.saveUApply()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindRegionChange:function(e){
    this.setData({
      region:e.detail.value
    })
  }
})