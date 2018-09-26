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

module.exports = {
    starConvert:starConvert
}