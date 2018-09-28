function onItemClick(event) {
    console.log(event);
    var itemId = event.currentTarget.dataset.itemId;
    console.log(itemId);
    wx.navigateTo({
        url: '/pages/movies/movie-detail/movie-detail?itemId=' + itemId
    })
}

module.exports = {
    onItemClick:onItemClick
}