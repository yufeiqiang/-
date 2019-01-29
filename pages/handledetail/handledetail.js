// pages/handledetail/handledetail.js
const urlList=require('../../config')
const citys= require('../../select')
const dateTimePicker= require('../../utils/dateTimePicker')
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
    area:[],
    building:[],
    builIndex:0,
    userType:"",
    parmData:{},
    dateTimeArray: null,
    dateTime: null,
  },
  bindcancel: function (e) {
      // console.log(this.data.obtainIndex)
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
    // console.log(this.data.obtainIndex)
  },

  // 滚动楼盘选项时触发
  bindPickerChange:function(e){
    this.setData({
      builIndex:e.detail.value
    })
  },

  // 点击确定按钮
  bindMultiPickerChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      multiIndex: e.detail.value,
    })
  },

  // 多项选项滚动时触发

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
    this.applyBuilding()
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
      data:{'userType':that.data.userType},
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

  // 请求楼宇
  applyBuilding(){
    let that=this
    this.initParmData()
    wx.request({
      url:urlList.applyBuilding,
      method:"post",
      header:{'content-type':'application/x-www-form-urlencoded'},
      data:that.data.parmData,
      success:function(e){
          let buidingArr=[]
          if(e.data.code==200){
            let  data=e.data.pojo
            data.forEach((item,index)=>{
              buidingArr.push(item.areolaName)
            })
            that.setData({
              building:buidingArr
            })
            console.log(that.data.building)
          }
          
      }
    })
  },

  // 改变时间
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
  },

  // 更改日期时间列
  changeDateTimeColumn(e){
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      _cur:1,
      userType:"personal",
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray
    })
    this.saveUApply()
    // console.log(dateTimePicker)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.applyBuilding()
    this.initParmData()
  },

  initParmData:function(){
    this.setData({
      parmData:{
        province:this.data.multiArray[0][this.data.multiIndex[0]],
        city:this.data.multiArray[1][this.data.multiIndex[1]],
        area:this.data.multiArray[2][this.data.multiIndex[2]],
        userType: 'personal'
      }
    })
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