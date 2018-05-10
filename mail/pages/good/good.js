const app = getApp()
Page({
  data: {
    good: [],
    showModalStatus: false,
    isLike: false,
    // banner
    imgUrls: [
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057921620_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057922659_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057923813_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057924965_middle.jpg",
      "http://mz.djmall.xmisp.cn/files/product/20161201/148057925958_middle.jpg"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    detailImg: [
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_1.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_2.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_3.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_4.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_5.jpg",
      "http://7xnmrr.com1.z0.glb.clouddn.com/detail_6.jpg",
    ],
  },
  onLoad: function (option) {
    let _this = this
    wx.request({
      url: 'http://localhost:8080/goods/getById/' + option.id, //仅为示例，并非真实的接口地址
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          good: res.data
        })
      }
    })


    wx.request({
      url: 'http://localhost:8080/like/getCount', //仅为示例，并非真实的接口地址
      method: 'get',
      data: { userId: 1, goodId: option.id },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data >= 1) {
          _this.setData({
            isLike: true
          })
        }
      }
    })
  },

  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike: function (e) {
    let _this = this
    const index = e.currentTarget.dataset.index;
    wx.request({
      url: 'http://localhost:8080/like/save', //仅为示例，并非真实的接口地址
      method: 'post',
      data: { userId: 1, goodId: index },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          isLike: !_this.data.isLike
        })
      }
    })
  },
  del: function (e) {
    let _this = this
    const index = e.currentTarget.dataset.index;
    wx.request({
      url: 'http://localhost:8080/like/del', //仅为示例，并非真实的接口地址
      method: 'post',
      data: { userId: 1, goodId: index },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' // 默认值
      },
      success: function (res) {
        _this.setData({
          isLike: !_this.data.isLike
        })
      }
    })
  },
  addCar: function (e) {
    //wx.setStorageSync('cart')
    let good = this.data.good
    let cartGoods = wx.getStorageSync("cart") || []
    let isAddCart = false
    cartGoods.forEach(function (cartGood, index) {
      if (good.id == cartGood.good.id) {
        cartGood.count++
        isAddCart = true
      }
    })
    if (!isAddCart) {
      let cartGood = {
        good: good,
        count: 1,
        active: false
      }
      cartGoods.unshift(cartGood)
    }
    wx.setStorageSync("cart", cartGoods)
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  },
  // 跳到购物车
  toCar: function () {
    wx.navigateTo({
      url: '../cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    })
  },
  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })

    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })

    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})