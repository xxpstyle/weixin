const app = getApp()

Page({
  data: {
    btnHidden: true,
    allSelect:false,
    actives: [],
    goods: []
  },

  onLoad: function () {
    let self = this;
    wx.request({
      url: 'http://localhost:8080/like/pager_criteria', //仅为示例，并非真实的接口地址
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

  settingHidden() {
    this.setData({ btnHidden: !this.data.btnHidden, actives: [], allSelect: false})
  },
  allSelect(){
    let actives = []
    let rows = this.data.goods.rows
    if (!this.data.allSelect){
      for (var i in rows){
        actives.push(rows[i].id)
      }
    }else{
      actives=[]
    }
    console.log(actives)
    this.setData({ allSelect: !this.data.allSelect, actives: actives })
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: '../good/good?id=' + e.target.dataset.id
    })
  },
  active(e) {
    let str
    let index = e.currentTarget.dataset.id
    let actives = this.data.actives
    let tmp = new Array()
    actives.push(index)
    for (var i in actives) {
      if (tmp.indexOf(actives[i]) == -1) {
        tmp.push(actives[i])
      } else {
        str = actives[i]
      }
    }
    for (var i in tmp) {
      if (tmp[i] == str) {
        tmp.splice(i, 1);
      }
    }
    this.setData({ actives: tmp })
    console.log(this.data.actives);
  },
  del(){
    let _this=this
    wx.request({
      url: 'http://localhost:8080/like/delMany', //仅为示例，并非真实的接口地址
      method: 'post',
      data: {
        userId: 1,
        ids:this.data.actives
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json' // 默认值
      },
      success: function (res) {
        _this.onLoad()
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    this.setData({ btnHidden: !this.data.btnHidden, actives: [], allSelect: false })
  }
})