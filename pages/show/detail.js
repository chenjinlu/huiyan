// pages/show/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showbar: ['最新', '最热', '规则'],
    currentTab: 0,
    pageId:0,
    disableBtn:false
  },

  /**
   * 页面导航
   */
  showbarTap: function (e) {
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      currentTab: idx,
      daohang: idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = this
    this.data.pageId = options.id;
    
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
    var obj = this
    wx.request({
      url: 'https://wx.ahifeng.com/index.php?s=/Mphuiyan/show/iteminfo', //仅为示例，并非真实的接口地址
      data: {
        id: this.data.pageId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var disabled = false;
        if (res.data.code == 0) {
          disabled = true;
        }
        obj.setData({
          details: res.data.item,
          newlist: res.data.newlist,
          hotlist: res.data.hotlist,
          disableBtn: disabled
        })
        wx.setNavigationBarTitle({
          title: res.data.item.title
        })
      }
    }) 
  },
  showPic:function(){
    
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
      url: '../upload/upload?id='+this.data.pageId
    })
  }

})