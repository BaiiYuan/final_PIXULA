var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        document.querySelector('.status').innerHTML =
            'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' + '<img class="upload_img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
    }
};

new Imgur({
    clientid: 'b411ccbe2c93f6e', //You can change this ClientID
    callback: feedback
});