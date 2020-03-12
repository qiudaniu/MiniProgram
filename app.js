//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // console.log(res)
          wx.request({
            url: this.globalData.domain + "/api/user/login?js_code=" + res.code,
            success: res_login => {
              console.log(res_login)
              this.globalData.login_key = res_login.data.login_key_sign
            },
            fail: res => {
              wx.showToast({
                title: '发送失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail: res => {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    domain: "https://qiudaniu.top",
    login_key: ""
  }
})