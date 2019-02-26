const regeneratorRuntime = require('../../utils/regenerator-runtime.js')
const dateUtil = require('../../utils/dateUtil.js')
const app = getApp()

Page({

  data: {
    name: '',
    address: '',
    quantity: 50,
    beginDate: '',
    beginTime: '',
    endDate: '',
    endTime: '',
    introduction: '',
    photos: []
  },

  onLoad: function(options) {
    this.setData({
      beginDate: dateUtil.formatPickerDate(new Date()),
      beginTime: '12:00',
      endDate: dateUtil.formatPickerDate(new Date()),
      endTime: '12:00'
    })
  },

  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

  addressInput(e) {
    this.setData({
      address: e.detail.value
    })
  },

  quantityInput(e) {
    this.setData({
      quantity: parseInt(e.detail.value)
    })
  },

  beginDateChange(event) {
    this.setData({
      beginDate: event.detail.value
    });
  },

  beginTimeChange(event) {
    this.setData({
      beginTime: event.detail.value
    });
  },

  endDateChange(event) {
    this.setData({
      endDate: event.detail.value
    });
  },

  endTimeChange(event) {
    this.setData({
      endTime: event.detail.value
    });
  },

  introductionInput(e) {
    this.setData({
      introduction: e.detail.value
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

  submit(e) {
    console.log(this.data)

    wx.navigateBack({
      url: "/pages/me/me"
    })
  }

})