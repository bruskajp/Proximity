function sendMessage() {
    let username = 'Benjamin';
    let message = document.getElementById('text');

    if (message.value.length == 0) return;

    let html = `<img src='https://pbs.twimg.com/profile_images/679016101024546816/Hk3g7JTY.jpg'><strong>${username}</strong>: ${message.value}`;
    let chat_item = document.createElement('chat-item');

    chat_item.innerHTML = html;

    document.getElementsByTagName('chat-list')[0].appendChild(chat_item);

    message.value = '';
}

function popup_dialog() {

}

$.ripple(".ripples", {
    debug: false, // Turn Ripple.js logging on/off
    on: 'mousedown', // The event to trigger a ripple effect

    opacity: 0.5, // The opacity of the ripple
    color: "auto", // Set the background color. If set to "auto", it will use the text color
    multi: true, // Allow multiple ripples per element

    duration: 0.7, // The duration of the ripple

    // Filter function for modifying the speed of the ripple
    rate: function(pxPerSecond) {
        return pxPerSecond;
    },

    easing: 'linear' // The CSS3 easing function of the ripple
});