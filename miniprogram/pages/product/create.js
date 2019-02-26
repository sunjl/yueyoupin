const app = getApp()
const regeneratorRuntime = require('../../utils/regenerator-runtime.js')
const dateUtil = require('../../utils/dateUtil.js')
const db = wx.cloud.database()

Page({

  data: {
    name: '',
    price: 0,
    quantity: 100,
    introduction: '',
    introductionLength: 0,
    photos: []
  },

  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  priceInput(e) {
    this.setData({
      price: parseFloat(e.detail.value)
    })
  },

  quantityInput(e) {
    this.setData({
      quantity: parseInt(e.detail.value)
    })
  },

  introductionInput(e) {
    this.setData({
      introduction: e.detail.value,
      introductionLength: e.detail.value.length
    })
  },

  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePaths = res.tempFilePaths
        filePaths.forEach((filePath) => {
          const uploadDate = new Date()
          const extension = filePath.match(/\.[^.]+?$/)[0]
          const baseName = app.globalData.openid + '-' + dateUtil.formatDate(uploadDate)
          const cloudPath = baseName + extension
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              that.setData({
                photos: that.data.photos.concat(res.fileID)
              });
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        })
      }
    })
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id,
      urls: this.data.photos
    })
  },

  submit: function() {
    const createDate = new Date()
    db.collection('products').add({
      data: {
        name: this.data.name,
        price: this.data.price,
        quantity: this.data.quantity,
        introduction: this.data.introduction,
        photos: this.data.photos,
        coverPhoto: this.data.photos[0],
        userId: app.globalData.userId,
        userInfo: app.globalData.userInfo,
        createDate: createDate,
        displayCreateDate: dateUtil.formatDisplayDate(createDate)
      },
      success: res => {
        this.setData({
          id: res._id
        })
        wx.navigateBack({
          url: "/pages/me/me"
        })
      }
    })
  }

})