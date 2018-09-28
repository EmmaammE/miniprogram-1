import postArticleEvent from "post-article/post-article-template";

var appInst =  getApp();

Page({
    data: {
        postItem: {
            authorAvatar: "/images/25704759.jpg",
            date: "一天前",
            articleImage: "/images/1.png",
            articleTitle: "洛阳伽蓝记",
            articleDetail: "刘白堕善酿酒,饮之香美,经月不醒.青州刺史毛鸿宾赍酒之藩,路逢劫贼,饮之即醉,皆被擒获.游侠语曰:“不畏张弓拔刀,但畏白堕春醪.",
            articleLike: 23,
            articleShare: 20,
        },
        // isPlayingMusic: false
    },

    navigate(){
       wx.navigateTo({
           url: "/pages/index/index"
       });
    },

    onLoading(){
        if (appInst.globalData.g__playingMusic) {
            this.setData({
                isPlayingMusic:false
            })
        } else {
            this.setData({
                isPlayingMusic:true
            })
        }
    },
    // onShow(){
    //     console.log(postArticleEvent);
    //     console.log(this.data.postItem);
    //     console.log(this.data.onStarClick);
    // },
    onClick: function () {
        console.log(this.data);
        console.log(postArticleEvent.onStarClick);
    },

    toPlayMusic: function () {
        console.log("...");
        const backgroundAudioManager = wx.getBackgroundAudioManager()
        if (this.data.isPlayingMusic) {
            backgroundAudioManager.pause();
        } else {
            backgroundAudioManager.title = '此时此刻'
            backgroundAudioManager.epname = '此时此刻'
            backgroundAudioManager.singer = '许巍'
            backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
            // 设置了 src 之后会自动播放
            backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
            // this.setData({
            //     isPlayingMusic: true
            // })

            backgroundAudioManager.onPause(() => {
                this.setData({
                    isPlayingMusic:false
                });
                appInst.globalData.g__playingMusic = false;
            })
            backgroundAudioManager.onPlay(() => {
                this.setData({
                    isPlayingMusic:true
                });
                appInst.globalData.g__playingMusic = true;
            })
        }
    },

    onStarClick: postArticleEvent.onStarClick,

    onTestAddress:function () {
      wx.chooseAddress({
        success:function (res){
          console.log(',,,,')
        }
      })
    }
})
