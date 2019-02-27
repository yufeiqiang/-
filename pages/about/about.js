const urlList=require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cur:"",
    currentIndex :'0',
    recruitData:[]
  },

  // 点击tab
  titleClick:function(e){
    let currentPageIndex =this.setData({
        currentIndex: e.currentTarget.dataset.idx
    })
  },
  // swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = e.detail.current
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      _cur:1
    })
    this.recruitList()
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
  recruitList(){
    const that=this
    wx.request({
      url:urlList.recruitList,
      method:"get",
      success:function(res){
        if(res.data.code==200){
          that.setData({
            recruitData:res.data.pojo
          })
        }
      }
    })
  }
})