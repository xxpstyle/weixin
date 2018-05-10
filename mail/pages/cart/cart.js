const app = getApp()
Page({
  data: {
    cart: [],
    btnHidden: false,
    noSelect: false,
    totalPrice: 0,
    allActive: false,
    selectedCount: 0
  },
  onShow: function () {
    this.setData({
      cart: wx.getStorageSync('cart') || [],
    })
  },
  //选中宝贝
  selectTap: function (e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let cart = this.data.cart;                    // 获取购物车列表
    const active = cart[index].active;         // 获取当前商品的选中状态
    cart[index].active = !active;              // 改变状态
    this.setData({
      cart: cart
    })
    this.isAllSelect()
    this.totalPay()
  },
  //全选选中宝贝
  allSelect: function (e) {
    let allActive = this.data.allActive;    // 是否全选状态
    allActive = !allActive;
    let cart = this.data.cart;
    for (let i = 0; i < cart.length; i++) {
      cart[i].active = allActive;            // 改变所有商品状态
    }
    this.setData({
      allActive: allActive,
      cart: cart
    });
    this.totalPay();
  },
  // 修改数量
  addCount: function (e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let cart = this.data.cart;                    // 获取购物车列表
    const count = cart[index].count         // 获取当前商品的选中状态
    if (count < 10) {
      cart[index].count = count + 1              // 改变状态
      this.setData({
        cart: cart
      })
    }
    this.totalPay()
  },
  minusCount: function (e) {
    const index = e.currentTarget.dataset.index    // 获取data- 传进来的index
    let cart = this.data.cart                    // 获取购物车列表
    const count = cart[index].count
    if (count > 1) {        // 获取当前商品的选中状态
      cart[index].count = count - 1            // 改变状态
      this.setData({
        cart: cart
      })
    }
    this.totalPay()
  },
  // 删除宝贝
  delCart: function () {
    let cart = this.data.cart
    let selectedCount = this.data.selectedCount
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].active) {
        cart.splice(i, selectedCount)
      }
    }
    if (selectedCount < 1) {
      wx.showToast({
        title: "你还未选择宝贝",
        icon: "none",
        duration: 2000
      })
    } else {
      this.totalPay()
      wx.setStorageSync('cart', cart)
      this.setData({
        cart: cart
      })
    }
  },
  settingHidden: function () {
    let btnHidden = !this.data.btnHidden
    this.setData({
      btnHidden: btnHidden
    })
  },
  // 计算总价
  totalPay() {
    let cart = this.data.cart;                  // 获取购物车列表
    let total = 0, selectedCount = 0;
    for (let i = 0; i < cart.length; i++) {         // 循环列表得到每个数据
      if (cart[i].active) {                   // 判断选中才会计算价格
        total += cart[i].count * cart[i].good.minPrice;     // 所有价格加起来
        selectedCount++
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      cart: cart,
      totalPrice: total.toFixed(2),
      selectedCount: selectedCount
    });
  },
  // 判断是否全选
  isAllSelect() {
    let cart = this.data.cart
    let allActive = true
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].active == false) {
        allActive = false
        break
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      allActive: allActive
    });
  }
})


