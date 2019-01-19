// pages/newdetail/newdetail.js
const urlList = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    createTime:'',
    newsTitle:'',
    newsInfor:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.newdetail()
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
  newdetail(){
    let that = this
    wx.request({
      url: urlList.newdetail,
      method: 'get',
      data:{id:this.data.id},
      success: function (res) {
        let data = res.data.pojo
        if (res.data.code == 200) {
          that.setData({
            newsInfor: data.newsInfor,
            createTime: data.createTime,
            newsTitle: data.newsTitle
          })
        }
      }
    })
  }
})