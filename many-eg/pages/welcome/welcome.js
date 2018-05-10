// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: [],
    jiePing:"",
    address:[],
    location:""
  },
  knowPhone() {
    let _this = this
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          phone: res
        })
      }
    })
  },
  onReady: function () {
    wx.onUserCaptureScreen(function (res) {
      console.log('用户截屏了')
      this.setData({ jiePing: '用户截屏了'})
    })
  },
  zhen(){
    wx.vibrateLong({
      success:function(){
        console.log("成功振动")
      }
    })
  },
  dong() {
    wx.vibrateShort({
      success: function () {
        console.log("成功振动2")
      }
    })
  },
  address(){
    let _this=this
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  location(){
    let _this=this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        _this.setData({ location: "经度：" + longitude + "纬度：" + latitude + "速度：" + speed + "位置的精确度：" + accuracy})
      }
    })
  },
  lookLocation() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  }
})