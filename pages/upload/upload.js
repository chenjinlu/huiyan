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
    pageId:0,
    length:0,
    disabledBtn:false
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
    let params = e.detail.value, that = this;
    if (that.data.pics.length == 0 || params.intro == ''){
      app.showError('图片和描述不能为空！');
      return false;
    }
    var openid = wx.getStorageSync('openid');
    if ( openid == '' ){
      app.showError('未获取到openid,请重新登录！');
      return false;
    }
    function createImgStr() {
      let idata = '';
      for (let i = 0; i < that.data.pics.length; i++) {
        if (i == that.data.pics.length-1 ){
          idata += that.data.pics[i];
        }else{
          idata += that.data.pics[i] + '|';
        }        
      }
      return idata;
    }
    let imgaesStr = createImgStr();

    let formData = {
      'pageId': that.data.pageId,
      'images': imgaesStr,
      'text': params.intro,
      'avatarUrl': that.data.userInfo.avatarUrl,
      'nickName': that.data.userInfo.nickName,
      'openid':openid
    }
    // console.log(formData);

    this.setData({ disabledBtn: true });
    wx.setNavigationBarTitle({ title: '正在提交' });

    wx.request({
      url: 'https://wx.ahifeng.com/index.php?s=/Mphuiyan/show/addpics', 
      data: formData,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        let result = res.data;
        console.log(result);
        if (result.code === 1) {         
          setTimeout(() => {
            wx.showToast({ title: result.msg, icon: 'success', duration: 2000 });
            wx.setNavigationBarTitle({ title: '上传成功' });
            that.formReset();
            setTimeout(function () {
              wx.navigateBack();
            }, 1800);
          }, 0);
        } else {
          app.showError(result.msg);
        }
      }
    })
  },
  formReset() {
    console.log('form发生了reset事件')
    this.setData({
      uploaderNum: 0,
      uploaderList: [],
      pics: [],
      note:'',
      length:0
    })
  },

  
  // 删除图片
  clearImg: function (e) {
    var nowList = [],imgList = this.data.pics;//新数据
    var uploaderList = this.data.uploaderList;//原数据

    uploaderList.splice(e.currentTarget.dataset.index, 1);//删预览图
    let delImgName = imgList.splice(e.currentTarget.dataset.index, 1);
    this.delBaseImg(delImgName);

    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: uploaderList,
      pics: imgList,
      showUpload: true
    })
  },
  //删除服务器上图片
  delBaseImg:function(url){
    // console.log(url[0])
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
  onLoad: function (options) {
    var obj = this
    this.data.pageId = options.id;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
                // console.log(res)
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
          that.data.pics = imgList;
          // console.log(imgList);
          // console.log('uploadImage ' + i + ' success, res is:', res.data)
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