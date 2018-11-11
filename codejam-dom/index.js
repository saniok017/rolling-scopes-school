const tips = ['<div id="tip">"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."<br>Vivamus tristique augue eros, quis sagittis elit commodo a. Suspendisse potenti.</div>', '<div id="tip">"Sed sollicitudin vitae purus a tempor. Nam quis libero ac arcu pharetra vehicula sit amet sed purus. Maecenas imperdiet lobortis massa sed tincidunt. Aliquam ultrices viverra dapibus. Integer consectetur ornare suscipit. Nullam ultricies tortor sed lacus fermentum tincidunt. Curabitur ex nisi, consequat aliquam massa nec, mollis consectetur diam. Cras id facilisis purus. Vivamus lectus nisi, congue id massa vel, dapibus laoreet risus. Integer ac dapibus nisi, vitae volutpat odio. Morbi nec volutpat purus, sed vestibulum arcu. Vestibulum iaculis quam quis mi finibus, sit amet faucibus quam euismod. Curabitur pretium ex id lorem ultrice.</div>', '<div id="tip">"Simply because it is pain..."<br>Vivamus tristique augue eros, quis sagittis elit commodo a. Suspendisse potenti.</div>'];
const esc = document.getElementById('esc');
const notifications = document.getElementById('notifications');
const buttons = document.getElementsByClassName('button');

if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', 'enabled');
};

if (localStorage.getItem('notifications') === 'enabled') {
    setTimeout(() => {
        notifications.classList.toggle('hidden');;
    }, 6000);
};

esc.addEventListener('click', function() {
    notifications.classList.toggle('hidden');
});

document.body.addEventListener('keydown', function(e) {
    if (e.keyCode == 27) {
        notifications.classList.toggle('hidden');
    }
    if (e.keyCode == 37) {
        leftArrow();
    }
    if (e.keyCode == 39) {
        rightArrow();
    }
});

function checkBox() {
    const box = document.querySelector('#disable');
    if (box.checked) {
        alert( 'notifications are disabled' );
        localStorage.setItem('notifications', 'disabled');
    } else {
        alert( 'notifications are enabled' );
        localStorage.setItem('notifications', 'enabled');
    }
}

function leftArrow() {
    let current = document.querySelector('.pressed');
    let indexOfCurrent = Array.prototype.slice.apply(buttons).indexOf(current);
    let prev = indexOfCurrent - 1;
    if (prev === -1) {
        prev = buttons.length - 1;
    };
    buttons[prev].classList.add('pressed');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] !== buttons[prev]) {
            buttons[i].classList.remove('pressed');
        }
        let tip = document.getElementById('tip');
        tip.outerHTML = tips[prev];
    }
}

function rightArrow() {
    let current = document.querySelector('.pressed');
    let indexOfCurrent = Array.prototype.slice.apply(buttons).indexOf(current);
    let next = indexOfCurrent + 1;
    if (next === buttons.length) {
        next = 0;
    };
    buttons[next].classList.add('pressed');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] !== buttons[next]) {
            buttons[i].classList.remove('pressed');
        }
        let tip = document.getElementById('tip');
        tip.outerHTML = tips[next];
    }
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', e => {
        e.currentTarget.classList.add('pressed');
        for (let j = 0; j < buttons.length; j++) {
            if (buttons[j] !== e.currentTarget) {
                buttons[j].classList.remove('pressed');
            }
        }
        let tip = document.getElementById('tip');
        tip.outerHTML = tips[i];
    })
};

