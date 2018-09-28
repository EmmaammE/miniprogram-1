var starConvert = function(stars) {
    // var starNum = parseInt(stars);
    // var fill = parseInt(starNum / 10);
    // var point = starNum % 10;

    var fill = stars.toString().slice(0,1);
    var array = [0,0,0,0,0];
    let j = 0;
    for(let i=0;i<fill;i++){
        array[j++] = 1;
    }

    return array;
}

var http = function (url,callback) {
    wx.request({
        url:url,
        method:'GET',
        success:function (res) {
            callback(res.data);
        },
        fail:function (error) {
            console.log(error);
        }
    })
}

function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

module.exports = {
    starConvert:starConvert,
    http:http,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos
}