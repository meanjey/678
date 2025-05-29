// 工具函数

// 检测两个矩形是否碰撞
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// 获取随机整数，范围为[min, max]
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 获取随机方向
function getRandomDirection() {
    return getRandomInt(0, 3); // 0-3对应上右下左
}

// 根据方向获取速度向量
function getVelocityFromDirection(direction, speed) {
    switch (direction) {
        case DIRECTION.UP:
            return { x: 0, y: -speed };
        case DIRECTION.RIGHT:
            return { x: speed, y: 0 };
        case DIRECTION.DOWN:
            return { x: 0, y: speed };
        case DIRECTION.LEFT:
            return { x: -speed, y: 0 };
        default:
            return { x: 0, y: 0 };
    }
}

// 将角度转换为弧度
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

// 将弧度转换为角度
function radiansToDegrees(radians) {
    return radians * 180 / Math.PI;
}

// 计算两点之间的距离
function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// 计算两点之间的角度（弧度）
function angleBetweenPoints(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}

// 限制值在指定范围内
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// 线性插值
function lerp(a, b, t) {
    return a + (b - a) * t;
}

// 将颜色从RGB转换为十六进制
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// 将十六进制颜色转换为RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }
    };
} 