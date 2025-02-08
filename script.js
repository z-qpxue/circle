const MAX_CIRCLES = 10;
let circles = [];

const imageContainer = document.getElementById('imageContainer');

function createCircle(x, y) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    circle.addEventListener('click', (e) => {
        e.stopPropagation();
        removeCircle(circle);
    });

    return circle;
}

function removeCircle(circle) {
    circle.style.animation = 'circle-disappear 0.3s ease-out forwards';
    setTimeout(() => {
        circle.remove();
        circles = circles.filter(c => c !== circle);
    }, 300);
}

function addCircle(e) {
    if (circles.length >= MAX_CIRCLES) return;

    const rect = imageContainer.getBoundingClientRect();
    const x = e.pageX - rect.left - window.scrollX;
    const y = e.pageY - rect.top - window.scrollY;

    const circle = createCircle(x, y);
    imageContainer.appendChild(circle);
    circles.push(circle);
}

// 事件监听
imageContainer.addEventListener('click', addCircle);

// 添加触摸设备支持
imageContainer.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const touchEvent = new MouseEvent('click', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    addCircle(touchEvent);
});