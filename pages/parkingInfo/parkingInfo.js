// pages/parkingInfo/parkingInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: []
  },

  getMap: function(res){
    wx.openLocation({        //所以这里会显示你当前的位置
      latitude: 30.3373,
      longitude: 120.1205,
      name: "南宁市西乡塘区秀厢大道东",
      address: "南宁市西乡塘区秀厢大道东",
      scale: 28
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        url: app.globalData.domain + '/api/parking/queryParkingLotByPId?pid=' + options.pid,
        success: res => {
          console.log(res)
        }
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