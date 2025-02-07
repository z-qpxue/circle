const MAX_CIRCLES = 10;
let circles = [];

const imageContainer = document.getElementById('imageContainer');
const clearButton = document.getElementById('clearButton');
const circleCount = document.getElementById('circleCount');
const maxCirclesMessage = document.getElementById('maxCirclesMessage');

function updateCircleCount() {
    circleCount.textContent = circles.length;

    if (circles.length >= MAX_CIRCLES) {
        maxCirclesMessage.classList.remove('hidden');
        maxCirclesMessage.style.animation = 'none';
        maxCirclesMessage.offsetHeight;
        maxCirclesMessage.style.animation = null;
    } else {
        maxCirclesMessage.classList.add('hidden');
    }
}

function createCircle(x, y) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    return circle;
}

function addCircle(e) {
    if (circles.length >= MAX_CIRCLES) {
        maxCirclesMessage.classList.remove('hidden');
        return;
    }

    const rect = imageContainer.getBoundingClientRect();
    const x = e.pageX - rect.left - window.scrollX;
    const y = e.pageY - rect.top - window.scrollY;

    const circle = createCircle(x, y);
    imageContainer.appendChild(circle);
    circles.push(circle);

    updateCircleCount();
}

function clearCircles() {
    circles.forEach(circle => {
        circle.style.animation = 'circle-disappear 0.3s ease-out forwards';
        setTimeout(() => circle.remove(), 300);
    });
    circles = [];
    updateCircleCount();
}

// 事件监听
imageContainer.addEventListener('click', addCircle);
clearButton.addEventListener('click', clearCircles);

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearCircles();
    }
});

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