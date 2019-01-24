// pages/handledetail/handledetail.js
const urlList=require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _cur:"",
    multiArray1:[],
    multiArray: [['无脊柱动物', '脊柱动物','哈哈哈哈'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    multiIndex: [0, 0, 0]
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    // console.log(e)
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          
          // case 0:
          //   console.log(115555)
          //   data.multiArray[1] = ['扁性动物11', '线形动物11', '环节动物11', '软体动物11', '节肢动物11']
          //   data.multiArray[2] = ['猪肉绦虫11', '吸血虫11']
          //   break
          // case 1:
          //   data.multiArray[1] = ['鱼', '两栖动物', '爬行动物']
          //   data.multiArray[2] = ['鲫鱼', '带鱼']
          //   break
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
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
          that.setData({
            multiArray1:res.data.pojo
          })
          that.changeData()
        }
      }
    })
  },
  changeData(){
    console.log(this.data.multiArray1)
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