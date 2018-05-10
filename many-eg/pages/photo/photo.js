//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tempFilePaths: '',
    source: "",
    recordUrl:""
  },

// 1、打开相册（data中的数据source）
  listenerButtonChooseImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      //original原图，compressed压缩图
      sizeType: ['original'],
      //album来源相册 camera相机 
      sourceType: ['album', 'camera'],
      //成功时会回调
      success: function (res) {
        //重绘视图
        that.setData({
          source: res.tempFilePaths,
        })

        wx.previewImage({
          current: 'http://119.29.74.46/myphoto/0.jpg', // 当前显示图片的链接，不填则默认为 urls 的第一张
          urls: ['http://119.29.74.46/myphoto/0.jpg',
            'http://119.29.74.46/myphoto/1.jpg',
            'http://119.29.74.46/myphoto/2.jpg',
            'http://119.29.74.46/myphoto/3.jpg',
            'http://119.29.74.46/myphoto/4.jpg'
            , 'http://119.29.74.46/myphoto/5.jpg',
            'http://119.29.74.46/myphoto/6.jpg',
            'http://119.29.74.46/myphoto/7.jpg'],
          success: function (res) {


          },
          fail: function () {
            // fail
          },
          complete: function () {
            // complete
          }
        })
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '欢迎使用颜大傻牌跑步计',
      desc: '将你的战绩分享到~~~',
      path: '/page/picture/picture.js'
    }
  },

  openImages() {
    let _this=this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          source: tempFilePaths
        })
        console.log(tempFilePaths)
      }
    })
  },



// 2、打开相册及拍照（data中的数据tempFilePaths）
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  },
})