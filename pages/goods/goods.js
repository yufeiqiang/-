const urlList=require('../../config.js')
const getData = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cur: "",
    goodsList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(()=>{
      this.goods()
    },3000)
    // this.goods()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      _cur: 1
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
  // 产品列表
  goods(){
    let that=this
    wx.request({
      url: urlList.goods,
      method:"get",
      success:function(res){
        let data=res.data
        if (data.code==200){
          that.setData({
            goodsList:data.pojo
          })
        }
      }
    })
  },
  // 点击产品
  navigators(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?id=' + id + ''
    })
  }

})