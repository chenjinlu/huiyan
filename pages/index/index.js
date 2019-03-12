//test.js
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    previousMargin: 0,
    nextMargin: 0,
    imgUrls: [
      '../../images/banner1.jpg',
      '../../images/banner2.jpg',
      '../../images/banner3.jpg'
    ],
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    //navbar: ['精选', '家庭相册', '乡村故事','飘在大城市','守艺人'],
    currentTab: 0,
    daohang: 0
  },
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      
      daohang : e.currentTarget.dataset.idx
      
    })
    
    this.onLoad()
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.daohang);
    var obj = this
    wx.request({
      url: 'https://wx.ahifeng.com/mphuiyan/jk/index_show.php?tj='+this.data.daohang, //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        obj.setData({
          indexlist: res.data
        })
        // console.log(res.data)
        
      }
    })
    wx.request({
      url: 'https://wx.ahifeng.com/mphuiyan/jk/navbar_show.php', //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        obj.setData({
          navbar: res.data
        })
        // console.log(res.data)
      }
    })
  },

  
})

function abc() {
  console.log(123)
};
function showindex(res) {
  console.log(res)
}