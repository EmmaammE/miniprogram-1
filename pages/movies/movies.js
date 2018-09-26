var util = require("../../utils/starConvert");

var appInst = getApp();
const debug = true;

/***
 * 如何抽象数据请求和处理的过程；
 * 如何对结果进行动态赋值处理。
 *      使用setData(object_name)。
 *      字符串，object_name[var_name] = XXX;---动态赋值
 * 如何处理模板内部的传递数据，只能使用相同变量名层层传递
 *      使用循环；
 *      将原准备使用的数据放在一个公共属性下
 */
Page({
    data:{
        inTheaters:{},
        top250:{},
        comingSoon:{}
    },
    onLoad: function (event) {
        var inTheatersUrl = appInst.globalData.g__doubanBase + "/v2/movie/in_theaters" + "?start=0&count=3";
        var comingSoonUrl = appInst.globalData.g__doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
        var top250Url = appInst.globalData.g__doubanBase + "/v2/movie/top250" + "?start=0&count=3";
        this.getMovies(inTheatersUrl,'inTheaters','正在热映');
        this.getMovies(top250Url,'top250','top250');
        this.getMovies(comingSoonUrl,'comingSoon','即将上映');
    },

    getMovies: function (url,setkey,subTitle) {
        let that = this;
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "json"
            },
            success: function (res) {
                debug && console.log(res.data);
                that.processData(res.data,setkey,subTitle)
            },
            fail: function (error) {
                // fail
                console.log(error)
            }
        })
    },

    processData: function (moviesOrigin,setkey,subTitle) {
        var movies = [];
        moviesOrigin.subjects.forEach(movie => {
            let ele = {};
            ele.stars = util.starConvert(movie.rating.stars);
            ele.img = movie.images.large;
            if (movie.title.length > 6 ) {
                ele.title = movie.title.slice(0,6) + "...";
            } else {
                ele.title = movie.title;
            }
            ele.rating = parseFloat(movie.rating.average).toFixed(1);
            ele.movieId = movie.id;
            movies.push(ele);
        });
        debug && console.log(movies);
        var temp = {};
        temp[setkey]= {
            movies:movies,
            subTitle:subTitle
        };
        this.setData(temp);
    }
})