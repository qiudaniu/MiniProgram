// pages/parkingInfo/parkingInfo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    location: []
  },

  order: function(res){
    console.log(res.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../order/order?pid=' + res.currentTarget.dataset.id,
    })
  },

  getMap: function(res){
    var that = this;
    wx.openLocation({        
      //所以这里会显示你当前的位置
      latitude: Number(that.data.location['lat']),
      longitude: Number(that.data.location['lng']),
      name: that.data.location['name'],
      address: that.data.location['address'],
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
          console.log(res.data.data)
          this.setData({
            location : res.data.data
          })
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