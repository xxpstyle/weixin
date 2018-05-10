const app = getApp()
Page({
  data: {
    list: [],
    showModal: false,
    id: 0,
    name: '',
    phone: '',
    address: '',
    ADDRESS_1_STR: '',
    active: 0,
    isUpdate: false,
    dataGet: []
  },
  onLoad: function (e) {
    let _this = this;
    wx.request({
      url: 'http://localhost:8080/address/listById/1', //仅为示例，并非真实的接口地址
      method: "get",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        _this.setData({
          list: res.data
        })
      }
    })
  },
  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  toNull() {
    this.setData({
      name: "",
      phone: "",
      ADDRESS_1_STR: "",
      address: ""
    })
  },
  toUpdate: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      showModal: true,
      isUpdate: true,
      id: index.id,
      name: index.name,
      phone: index.phone,
      address: index.address
    })
  },
  toAdd: function () {
    this.setData({
      showModal: true,
      isUpdate: false
    })
  },
  btnSelected: function (e) {
    const index = e.currentTarget.dataset.id;
    const active = e.currentTarget.dataset.active;
    if (active == 2) {
      wx.showToast({
        title: "该收货地址已设为默认",
        icon: 'none',
        duration: 2000
      })
      return
    }
    let _this = this
    wx.request({
      url: 'http://localhost:8080/address/updateActive', //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        id: index,
        userId: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' // 默认值
      },
      success: function (e) {
        _this.onLoad()
        wx.showToast({
          title: "设定成功！",
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  update: function (e) {
    let _this = this
    wx.request({
      url: 'http://localhost:8080/address/update',
      method: "post",
      data: {
        id: this.data.id,
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.ADDRESS_1_STR
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' // 默认值
      },
      success: function (e) {
        _this.onLoad();
        wx.showToast({
          title: "修改成功！",
          icon: 'success',
          duration: 2000
        })
      }
    })
    this.hideModal();
  },
  del: function (e) {
    let _this = this
    wx.showModal({
      title: '删除',
      content: '确定要删除此个收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          const index = e.currentTarget.dataset.id;
          wx.request({
            url: 'http://localhost:8080/address/del',
            method: "post",
            data: {
              id: index
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json' // 默认值
            },
            success: function (e) {
              _this.onLoad()
              wx.showToast({
                title: "删除成功！",
                icon: 'success',
                duration: 2000
              })
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
  add: function () {
    if (this.data.name == "") {
      wx.showToast({
        title: '请输入您的姓名！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入您的手机号！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.ADDRESS_1_STR == "") {
      wx.showToast({
        title: '请选择您的收货地址！',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let _this = this
    wx.request({
      url: 'http://localhost:8080/address/save', //仅为示例，并非真实的接口地址
      method: "post",
      data: {
        name: this.data.name,
        phone: this.data.phone,
        address: this.data.ADDRESS_1_STR,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' // 默认值
      },
      success: function (res) {
        _this.onLoad()
        wx.showToast({
          title: "添加成功！",
          icon: 'success',
          duration: 2000
        })
      }
    })
    this.hideModal();
  },



  //打开弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.toNull()//清空表单中的数据
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },





  bingAddressTap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
        var REGION_PROVINCE = [];
        var addressBean = {
          REGION_PROVINCE: null,
          REGION_COUNTRY: null,
          REGION_CITY: null,
          ADDRESS: null
        };
        function regexAddressBean(address, addressBean) {
          regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
          var addxress = regex.exec(address);
          addressBean.REGION_CITY = addxress[1];
          addressBean.REGION_COUNTRY = addxress[2];
          addressBean.ADDRESS = addxress[3] + "(" + res.name + ")";
          console.log(addxress);
        }
        if (!(REGION_PROVINCE = regex.exec(res.address))) {
          regex = /^(.*?(省|自治区))(.*?)$/;
          REGION_PROVINCE = regex.exec(res.address);
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(REGION_PROVINCE[3], addressBean);
        } else {
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(res.address, addressBean);
        }
        that.setData({
          ADDRESS_1_STR:
          addressBean.REGION_PROVINCE + " "
          + addressBean.REGION_CITY + ""
          + addressBean.REGION_COUNTRY + "  "
          + addressBean.ADDRESS
        });
        that.setData(addressBean);
      }
    })
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  }

})


