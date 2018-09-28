const debug = true;
var appInst = getApp();
var util = require("../../../utils/starConvert");

// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subTitle: '',
    movies: [],
    url:'',
    count:0,
    refresh:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var subTitle = options.catagory;
    var url = '';
    debug && console.log(subTitle);
    this.setData({
      subTitle: subTitle
    })
    switch (subTitle) {
      case '正在热映':
        url = appInst.globalData.g__doubanBase + "/v2/movie/in_theaters";
        break;
      case '即将上映':
        url = appInst.globalData.g__doubanBase + "/v2/movie/coming_soon";
        break;
      case 'top250':
        url = appInst.globalData.g__doubanBase + "/v2/movie/top250";
        break;
      default:
        console.log(subTitle);
    }
    this.setData({
      url:url
    })
    util.http(url,this.processData);
  },

  processData:function (data) {
    wx.showNavigationBarLoading();
    var movies = this.data.refresh ? [] : this.data.movies;
    data.subjects.forEach(movie => {
      let ele = {};
      ele.stars = util.starConvert(movie.rating.stars);
      ele.img = movie.images.large;
      if (movie.title.length > 6) {
        ele.title = movie.title.slice(0, 6) + "...";
      } else {
        ele.title = movie.title;
      }
      ele.rating = parseFloat(movie.rating.average).toFixed(1);
      ele.movieId = movie.id;
      movies.push(ele);
    });
    var count = this.data.count;
    this.setData({
      movies:movies,
      count:count+20
    })
    wx.hideNavigationBarLoading();
    this.setData({
      refresh:false
    })
  },

  onScrollLower:function () {
    debug && console.log('scroll');
    var nextUrl = this.data.url + "?start=" + this.data.count + "&count=20";
    util.http(nextUrl,this.processData);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.subTitle,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("pull down");
    this.setData({
      refresh:true,
      // 确保上拉触底从原来开始加载
      count:0
    })
    var nextUrl = this.data.url + "?start=0&count=20";
    util.http(nextUrl, this.processData);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    debug && console.log('scroll');
    var nextUrl = this.data.url + "?start=" + this.data.count + "&count=20";
    util.http(nextUrl, this.processData);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})