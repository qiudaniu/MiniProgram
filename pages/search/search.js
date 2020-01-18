// pages/search/search.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [] //1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19
  },

  confirmSearch: function(event){
    wx.request({
      url: app.globalData.domain + "/api/parking/queryExactParking?area_name=" + event.detail.value,
      success: res => {
        if(res.data.code == 200){
          this.setData({
            array: res.data.data
          })
        }else{
          wx.showToast({
            title: '没有数据',
            icon: 'none',
            duration: 2000
          })
        }
        console.log(res.data.data)
      },
      fail: res => {
        wx.showToast({
          title: '发送失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  getParkingInfoDetail: function(res){
    wx.navigateTo({
      url: '../parkingInfo/parkingInfo?pid=' + res.currentTarget.dataset.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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