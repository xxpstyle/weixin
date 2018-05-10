const app = getApp()

Page({
  data: {
    imgUrls: [
      ' http://img12.360buyimg.com/n7/jfs/t6109/160/5518324313/234407/f5cde5b4/596c7113N61f7d813.jpg',
      'http://img13.360buyimg.com/n7/jfs/t12673/267/1616968484/322813/53a93eda/5a24badaN7c926026.jpg',
      ' https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521774822859&di=cca56f2a5da0ca1e30030b002b06be99&imgtype=0&src=http%3A%2F%2Fimg1.gtimg.com%2Fdigi%2Fpics%2Fhv1%2F30%2F38%2F2163%2F140658795.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    goods: []
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let self = this;
    wx.request({
      url: 'http://localhost:8080/goods/pager_criteria', //仅为示例，并非真实的接口地址
      method: 'get',
      data: {
        pageNo: 1,
        pageSize: 10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        self.setData({
          goods: res.data
        })
      }
    })
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: '../good/good?id=' + e.target.dataset.id
    })
  }
})