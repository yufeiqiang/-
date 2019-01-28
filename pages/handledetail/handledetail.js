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
    obtainIndex:[],
    name:[],
    city:[],
    area:[]
  },
  bindcancel: function (e) {
      console.log(this.data.obtainIndex)
      this.setData({
        multiArray:[this.changeName(), this.changeCity(0), this.changeArea(0, 0)],
        multiIndex:[0,0,0]
      })
  },
  obtainIndex: function (e) {
      let data={
        newinde: this.data.multiIndex
      }
    this.data.obtainIndex=data.newinde
    console.log(this.data.obtainIndex)
  },
  bindMultiPickerChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
    })
  },
  bindMultiPickerColumnChange: function (e) {
    var data = {
      multiIndex: this.data.multiIndex,
      multiArray: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        data.multiArray=[this.changeName(),
          this.changeCity(data.multiIndex[0]),
          this.changeArea(data.multiIndex[0], data.multiIndex[1])];
        data.multiIndex[1] = 0
        data.multiIndex[2] = 0
        break
      case 1:
        data.multiArray = [this.changeName(), this.changeCity(data.multiIndex[0]), this.changeArea(data.multiIndex[0], data.multiIndex[1]) ]
        data.multiIndex[2] = 0
        break
      case 2:
        data.multiArray = [this.changeName(), this.changeCity(data.multiIndex[0]), this.changeArea(data.multiIndex[0], data.multiIndex[1])]
         
    }
    this.setData(data);
  },
  // 初始化获取省份
  changeName(){
    const name=this.data.name=[]
    this.data.multiArray1.forEach(function(item,index){
      name.push(item.name)
    })
    return name
  },

  // 初始化获取市区
  changeCity(index){
    let city = this.data.city=[]
    this.data.multiArray1[index].city.forEach(function(item){
        city.push(item.name)
    })
    return city
  },

  // 初始化获取县
  changeArea(indexName,indexCity){
    const area = this.data.area=[]
    this.data.multiArray1[indexName].city[indexCity].area.forEach(function(item){
        area.push(item)
    })
    return area
  },

  // 请求城市列表
  saveUApply(){
    let that=this
    wx.request({
      url: urlList.saveUApply,
      header:{'content-type':'application/x-www-form-urlencoded'},
      method:"post",
      data:{'userType':'personal'},
      success:function(res){
        if(res.data.code==200){
            that.setData({
              multiArray1: res.data.pojo
            })
            that.setData({
              multiArray:[that.changeName(),that.changeCity(0),that.changeArea(0, 0)]
            })
        }
      }
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