const urlList=require('../../config')
const citys= require('../../select')
const dateTimePicker= require('../../utils/dateTimePicker')
import WxValidate from '../../utils/WxValidate.js'
var Validate 
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
  // 取消按钮
  bindcancel: function (e) {
      // console.log(this.data.obtainIndex)
      this.setData({
        multiArray:[this.changeName(), this.changeCity(0), this.changeArea(0, 0)],
        multiIndex:[0,0,0]
      })
      this.applyBuilding()
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
          data.multiIndex[1] = 0
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
            // console.log(that.data.building)
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
      userType: options.userType,
      // userType: "business",
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray
    })
    this.saveUApply()
    this.initValidate()
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
        userType: this.data.userType
        // userType: "business"
      }
    })
  },
  
  /**
    初始化表单
   */
  initValidate(){
    // 数据进行验证
    const rules ={
      username:{
        required: true
      },
      phone:{
        required:true
      }
    }

    // 验证字段的提示信息，若不传提示默认的信息
    const messages={
        username:{
          required:"请输入姓名"
        },
        phone:{
          required:"手机号必填"
        }
    }
    this.Validate=new WxValidate(rules,messages)
  },
  /** 
   提交表单
  */
  formSubmit(e){

    // 参数的拼接
    let formParam = e.detail.value;

    formParam.callTime = this.data.dateTimeArray[0][this.data.dateTime[0]] + '-' + this.data.dateTimeArray[1][this.data.dateTime[1]] + '-' + this.data.dateTimeArray[2][this.data.dateTime[2]] + ' ' + this.data.dateTimeArray[3][this.data.dateTime[3]] + ':' + this.data.dateTimeArray[4][this.data.dateTime[4]] + ':' + this.data.dateTimeArray[5][this.data.dateTime[5]] ;

    formParam.province = this.data.multiArray[0][this.data.multiIndex[0]];

    formParam.city = this.data.multiArray[1][this.data.multiIndex[1]];

    formParam.area = this.data.multiArray[2][this.data.multiIndex[2]];

    formParam.areolaName = this.data.building[this.data.builIndex]

    formParam.userType = this.data.userType

    // 提交判断
    if (!this.Validate.checkForm(e.detail.value)){
      const error = this.Validate.errorList[0];
      wx.showToast({
          title: `${error.msg}`,
          icon: 'none',
          mask:true
      })
      return false
    }
    this.saveUserApply(formParam)
  },

  // 提交表单
  saveUserApply(param){
    wx.request({
      url:urlList.saveUserApply,
      data:param,
      header:{'content-type':'application/x-www-form-urlencoded'},
      method:'post',
      success:function(e){
          let data=e.data
          if(data.code==200){
            wx.showModal({
              content: `${data.desc}`,
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                } 
              }
            })
          }else{
            console.log(data.desc)
          }
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