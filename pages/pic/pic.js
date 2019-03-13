// pages/pic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    num:1,
    count:1,
    imgUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this
    wx.request({
      url: 'https://wx.ahifeng.com/index.php?s=/Mphuiyan/show/picinfo', //仅为示例，并非真实的接口地址
      data: {id: options.id},
      header: {'content-type': 'application/json'},
      success: function (res) {

        if (res.data.code == 1) {
          obj.setData({
            details: res.data.item,
            info: res.data.info,
            count: res.data.info.imgs.length,
            imgUrls: res.data.info.imgs
          })
          wx.setNavigationBarTitle({
            title: res.data.item.title
          })
        }else{
          wx.navigateBack();
        }
        
      }
    })
  },
  changepic:function(e){
    this.setData({
      num: e.detail.current+1
    })
  },
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.imgUrls,
      current: that.data.imgUrls[e.currentTarget.dataset.index]
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