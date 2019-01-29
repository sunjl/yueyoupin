const regeneratorRuntime = require('../../utils/regenerator-runtime.js')
const app = getApp()

Page({

  data: {
    name: '',
    detail: ''
  },

  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  detailInput(e) {
    this.setData({
      detail: e.detail.value
    })
  },

  async formSubmit(e) {
    console.log(this.data)

    wx.navigateBack({
      url: "/pages/me/me"
    })
  }
})