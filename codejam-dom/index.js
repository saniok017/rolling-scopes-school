localStorage.setItem('notifications', 'enabled');

function klick() {
    let c = document.querySelector('#disable');
    if (c.checked) {
        alert( 'notifications are disabled' );
        localStorage.setItem('notifications', 'disabled');
    } else {
        alert( 'notifications are enabled' );
        localStorage.setItem('notifications', 'enabled');
    }
}
