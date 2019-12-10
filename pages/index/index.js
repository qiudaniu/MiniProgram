//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: [],
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo")
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  onLoad: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === true) { // 成功授权
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setUserInfoAndNext(res)
            }
          })
        } else if(this.data.canIUse){
          app.userInfoReadyCallback = res => {
            
          }
        }else { // 没有弹出过授权弹窗
          console('no')
        }
      }
    })
  },

  // 获取个人信息成功，然后处理剩下的业务或跳转首页
  setUserInfoAndNext(res) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    if (this.userInfoReadyCallback) {
      this.userInfoReadyCallback(res)
    }
    // 跳转首页
    wx.reLaunch({
      url: '../search/search'
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    if(app.globalData.userInfo){
      wx.reLaunch({
        url: '../search/search',
      })
    } else {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo'] === false){
            console.log('未授权')
          }
        }
      })
    }
  }
})
