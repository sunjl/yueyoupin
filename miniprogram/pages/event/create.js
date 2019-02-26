const app = getApp()
const regeneratorRuntime = require('../../utils/regenerator-runtime.js')
const dateUtil = require('../../utils/dateUtil.js')
const db = wx.cloud.database()

Page({

  data: {
    name: '',
    address: '',
    quantity: 100,
    beginDate: '',
    beginTime: '',
    endDate: '',
    endTime: '',
    introduction: '',
    introductionLength: 0,
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
    const beginDateTime = dateUtil.concatDateTime(this.data.beginDate, this.data.beginTime)
    const endDateTime = dateUtil.concatDateTime(this.data.endDate, this.data.endTime)
    db.collection('events').add({
      data: {
        name: this.data.name,
        address: this.data.address,
        quantity: this.data.quantity,
        beginDateTime: beginDateTime,
        endDateTime: endDateTime,
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