// pages/new/new.js
const urlList=require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cur:"",
    newData:[],
    height:'',
    pageNum:1,
    isFrom:true,
    newloadding:true,
    loaddingComplete:false,
    onoff:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _cur:1
    })
    this.newList(1)
    wx.getSystemInfo({
      success:(res)=>{
        this.setData({
          height:res.windowHeight
        })
      }
    })
    
  },

  /**
 * 下拉加载更多
 */
  loadmore() {
    let that=this
    if(that.data.newloadding && !this.data.loaddingComplete){
      that.setData({
        pageNum:that.data.pageNum+1,
        isFrom:false
      })
      let i=that.data.pageNum
      that.newList(i)
    }
  },
  /**
   * 请求新闻列表
   */
  newList(pageNum){
    let that=this
    wx.request({
      url:urlList.newList,
      method:'get',
      data:{pageNum:pageNum},
      success:function(res){
        that.dataList(res,that)
      }
    })
  },
  /**
   * 
   * 访问网络 
   */
  dataList(data,that){
    if(data.data.code==200){
      let entryList=data.data.pojo.entryList
      if(entryList.length > 0){
          let arrNewList=[];
          that.data.isFrom ? arrNewList=entryList : arrNewList= that.data.newData.concat(entryList)
          that.setData({
            newData:arrNewList
          })
      }else{
        that.setData({
          loaddingComplete:true,
          newloadding:false
        })
      }
    }
  },
  navigators(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../newdetail/newdetail?id='+id+''
    })
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

  }
})