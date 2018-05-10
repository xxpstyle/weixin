//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
   page:{
     pageNo:0,
     pageSize:2,
     rows:[]
    }
  },
  onLoad() {

  },
  onShow() {
    this.getUserInfo();
  },
  getUserInfo: function (cb) {
    var that = this
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo
            });
          }
        })
      }
    })
  },
  toPhone(){
    wx.makePhoneCall({
      phoneNumber: '15270743950' //仅为示例，并非真实的电话号码
    })
  }
})