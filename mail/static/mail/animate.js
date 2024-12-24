
document.addEventListener('DOMContentLoaded', function() {
    const box = document.getElementById('animated-box');
    let position = 0;
    const interval = setInterval(frame, 10);

    function frame() {
        if (position >= 350) {
            clearInterval(interval);
        } else {
            position++;
            box.style.top = position + 'px';
            box.style.left = position + 'px';
        }
    }
});