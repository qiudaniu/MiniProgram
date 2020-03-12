// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carno: '',
    phoneNumber: '',
    beginTime: "2019-11-11 11:11:00",
    finalTime: '2019-11-11 11:11:00',
    pid: ''
  },

  handleChangeBegin(e) {
    this.setData({
      beginTime: e.detail.dateString
    })
  },

  handleChangeFinal(e) {
    this.setData({
      finalTime: e.detail.dateString
    })
  },

  submitOrder(){
    wx.request({
      url: app.globalData.domain + "/api/order/createOrder?mobile=" + this.data.phoneNumber + "&card_no=" + this.data.carno + "&parking_lot_id=" + this.data.pid + "&start_time=" + this.data.beginTime + "&end_time=" + this.data.finalTime,
      success: res=> {
        if(res.data.code == 200){
          wx.showToast({
            title: '预约成功，请支付' + res.data.data.Money + '元',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.domain + "/api/user/queryUser?login_key=" + app.globalData.login_key,
      success: res => {
        this.setData({
          carno: res.data.UserCardId,
          phoneNumber: res.data.UserMobile
        })
      }
    }),
    console.log(options)
    this.setData({
      pid: options.pid
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