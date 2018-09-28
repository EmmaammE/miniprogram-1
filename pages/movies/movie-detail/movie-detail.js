// pages/movies/movie-detail/movie-detail.js
var appInst =  getApp();
var util = require('../../../utils/starConvert');
const debug = true;
Page({

  data: {
    movieItem:{}
  },

  onLoad: function (options) {
    var itemId = options.itemId;
    var url = appInst.globalData.g__doubanBase + '/v2/movie/subject/' + itemId;
    util.http(url,this.processData);
  },

  processData:function (data) {
    debug && console.log(data) ;
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.starConvert(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.setData({
      movieItem:movie
    })
  }
})