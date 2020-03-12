// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    phoneNumber: '',
    carno: '',
    hiddenmodalput: true,
    modaltitle: ''
  },

  //点击按钮弹窗指定的hiddenmodalput弹出框 
  modalinputcarno: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      modaltitle: "车牌号码"
    })
  },

  modalinputphone: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput,
      modaltitle: "联系方式"
    })
  },

  //取消按钮 
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },

  //获取input数据
  getinput: function(res){
    console.log(res);
    if (this.data.modaltitle == "车牌号码"){
      this.setData({
        carno: res.detail.value
      })
    }else if(this.data.modaltitle == "联系方式"){
      this.setData({
        phoneNumber: res.detail.value
      })
    }
  },

  //确认 
  confirm: function () {
    var self = this
    wx.request({
      url: app.globalData.domain + "/api/user/updateUser?login_key=" + app.globalData.login_key + "&userMobile=" + self.data.phoneNumber + "&userCardNo=" + self.data.carno,
      success: res => {
        console.log(res)
      }
    })
    
    this.setData({
      hiddenmodalput: true
    })
  },

  getUserInfo: function(e){
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else if(this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }else{
      wx.getUserInfo({
        success: function(res) {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    wx.request({
      url: app.globalData.domain + "/api/user/queryUser?login_key=" + app.globalData.login_key,
      success: res => {
        this.setData({
          carno: res.data.UserCardId,
          phoneNumber: res.data.UserMobile
        })
      }
    })
  },

  getHistoryOrder: function(res){
      wx.navigateTo({
        url: '../historyOrder/historyOrder',
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})