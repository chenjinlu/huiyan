// pages/upload/upload.js
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    note: '',
    uploaderList: [],
    uploaderNum: 0,
    showUpload: true,
    pics: [],
    userInfo: {},
  },
  // textarea
  note: function (e) {
    this.setData({
      note: e.detail.value,
      length: e.detail.value.length
    })
  },

  // 表单提交事件
  formSubmit (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset() {
    console.log('form发生了reset事件')
  },

  
  // 删除图片
  clearImg: function (e) {
    var nowList = [],imgList = this.data.pics;//新数据
    var uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    let delImgName = imgList.splice(e.currentTarget.dataset.index, 1);
    this.delBaseImg(delImgName);

    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      pics: imgList,
      showUpload: true
    })
  },
  //删除服务器上图片
  delBaseImg:function(url){
    console.log(url[0])
    wx.request({
      url: 'https://wx.ahifeng.com/Original/Upload/delimg', //仅为示例，并非真实的接口地址
      data: {
        'filename': url[0]
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method:'POST',
      success: function (res) {
        
      }
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    // pics = this.data.pics;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res.data)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        } 
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
        // console.log(uploaderList)
        that.uploadMorePic(tempFilePaths)
        
      }
    })
  },
  onLoad: function () {
    var obj = this
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // console.log(res.userInfo)
                obj.setData({
                  userInfo: res.userInfo
                })
            }
          })
        }
      }
    })
  },
  uploadMorePic: function (data) {
    var that = this
    wx.showNavigationBarLoading();
    for (let i = 0; i < data.length; i++) {
      let imageSrc = data[i]
      wx.setNavigationBarTitle({ title: '正在上传第' + (i + 1) + '张图片' });
      wx.uploadFile({
        url: 'https://wx.ahifeng.com/Original/Upload/uppic',
        filePath: imageSrc,
        name: 'file',
        success: function (res) {
          var imgList = that.data.pics;
          let result = JSON.parse(res.data)
          imgList.push(result.info)
          console.log(imgList);
          console.log('uploadImage ' + i + ' success, res is:', res.data)
        },
        fail: function ({ errMsg }) {
          console.log('uploadImage ' + i + ' fail, errMsg is', errMsg)
        }
      })
    }
    wx.hideNavigationBarLoading();
    wx.setNavigationBarTitle({ title: '上传作品' });
  }
  
})