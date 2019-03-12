// pages/show/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showbar: ['最新', '最热', '规则'],
    currentTab: 0,
  },

  /**
   * 页面导航
   */
  showbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      daohang: e.currentTarget.dataset.idx

    })
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this
    wx.request({
      url: 'https://wx.ahifeng.com/mphuiyan/jk/show_show.php', //仅为示例，并非真实的接口地址
      data: {
        id: options.id
        //y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        obj.setData({
          details: res.data,
        })
        wx.setNavigationBarTitle({
          title: res.data[0].title
        })
      }
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

  },
  /**
   * 用户点击右上角分享
   */
  applySubmit: function () {
    wx.navigateTo({
      url: '../upload/upload'
    })
  }

})