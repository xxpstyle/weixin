const app = getApp()
Page({
  data: {
    a: 0,
    min:1,
    max:100,
    numValue:'',
    inputValue:''
  },
  start:function(e){
    this.setData({
      a: parseInt(Math.random(100) * 100)
    })
  },
  guess:function(e){
    if (this.data.numValue =='') {
      this.setData({
        inputValue: '请输入1~100的数字，现在范围是' + this.data.min + '~' + this.data.max,
      })
    } else if (this.data.numValue > this.data.a){
      this.setData({
        inputValue: '太大了，现在范围是' + this.data.min + '~' + this.data.numValue,
        max: this.data.numValue
      })
    } else if (this.data.numValue < this.data.a) {
      this.setData({
        inputValue: '太小了，现在范围是' + this.data.numValue + '~' + this.data.max,
        min: this.data.numValue
      })
    } else if (this.data.numValue == this.data.a){
      this.setData({
        inputValue: '恭喜你猜对了，答案是' + this.data.a,
        a:0
      })
    }else{
      this.setData({
        inputValue: '请输入1~100的数字，现在范围是：'+this.data.min + '~' + this.data.max
      })
    }
  },
  numValue: function (e) {
    this.setData({
      numValue: e.detail.value
    })
  }
})
