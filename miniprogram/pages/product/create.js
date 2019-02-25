const regeneratorRuntime = require('../../utils/regenerator-runtime.js')
const app = getApp()

Page({

  data: {
    name: '',
    price: 0,
    quantity: 0,
    detail: '',
    photos: []
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

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({
          photos: that.data.photos.concat(res.tempFilePaths)
        });
      }
    })
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.photos
    })
  },

  async formSubmit(e) {
    console.log(this.data)

    wx.navigateBack({
      url: "/pages/me/me"
    })
  }

})