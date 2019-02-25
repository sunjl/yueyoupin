const app = getApp()
const dateUtil = require('../../utils/dateUtil.js')

const db = wx.cloud.database()

Page({

  data: {
    hasUserInfo: false,
    userInfo: {
      avatarUrl: '../../images/me/avatar.png'
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.addUser(app.globalData.userInfo)
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.addUser(res.userInfo)
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.addUser(app.globalData.userInfo)
        }
      })
    }
  },

  getUserInfo(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      this.addUser(app.globalData.userInfo)
    }
  },

  addUser(userInfo) {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.setData({
          openid: app.globalData.openid
        })
        const db = wx.cloud.database({})
        db.collection('users').where({
          openid: app.globalData.openid
        }).get({
          success(res) {
            if (res.data.length == 0) {
              const createDate = new Date()
              const displayCreateDate = dateUtil.formatDisplayDate(createDate)
              db.collection('users').add({
                data: {
                  avatarUrl: userInfo.avatarUrl,
                  gender: userInfo.gender,
                  nickName: userInfo.nickName,
                  openid: app.globalData.openid,
                  createDate: createDate,
                  displayCreateDate: displayCreateDate
                },
                success(res) {
                  app.globalData.userId = res._id
                }
              })
            } else {
              app.globalData.userId = res.data[0]._id
            }
          }
        })
      }
    })
  },

  listProduct: function(options) {
    wx.navigateTo({
      url: '../product/list?userId=' + app.globalData.userId
    })
  },

  listEvent: function(options) {
    wx.navigateTo({
      url: '../event/list?userId=' + app.globalData.userId
    })
  },

  listGroup: function(options) {
    wx.navigateTo({
      url: '../group/list?userId=' + app.globalData.userId
    })
  },

  doCreate(e) {
    wx.showActionSheet({
      itemList: ['商品', '活动', '群组'],
      success: res => {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../product/create'
          })
        } else if (res.tapIndex === 1) {
          this.doCreateEvent()
        } else if (res.tapIndex === 2) {
          this.doCreateGroup()
        }
      }
    })
  },

  doCreateProduct: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        const uploadDate = new Date()
        const extension = filePath.match(/\.[^.]+?$/)[0]
        const baseName = app.globalData.openid + '-' + dateUtil.formatDate(uploadDate)
        const cloudPath = baseName + extension
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            app.globalData.fileID = res.fileID
            db.collection('products').add({
              data: {
                cloudPath: app.globalData.fileID,
                userId: app.globalData.userId,
                userInfo: app.globalData.userInfo,
                createDate: uploadDate,
                displayCreateDate: dateUtil.formatDisplayDate(uploadDate)
              },
              success: res => {
                this.setData({
                  id: res._id
                })
              }
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    })
  }

})