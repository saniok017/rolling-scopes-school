const esc = document.getElementById('esc');
const notifications = document.getElementById('notifications');

esc.addEventListener('click', function() {
    notifications.classList.toggle('hidden');
});

document.body.addEventListener('keydown', function(e) {
    if (e.keyCode == 27) {
        notifications.classList.toggle('hidden');
    }
});

function klick() {
    const c = document.querySelector('#disable');
    if (c.checked) {
        alert( 'notifications are disabled' );
        localStorage.setItem('notifications', 'disabled');
    } else {
        alert( 'notifications are enabled' );
        localStorage.setItem('notifications', 'enabled');
    }
};
