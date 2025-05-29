// 坦克基类
class Tank extends Sprite {
    constructor(x, y, width, height, speed, direction) {
        super(x, y, width, height);
        
        this.speed = speed;
        this.direction = direction;
        
        this.isMoving = false;
        this.health = 1;
        this.maxHealth = 1;
        
        // 射击相关
        this.bulletSpeed = 6;
        this.bulletDamage = 1;
        this.reloadTime = 500; // 毫秒
        this.lastShotTime = 0;
        
        // 动画相关
        this.spriteSheet = null;
    }
    
    // 设置精灵表
    setSpriteSheet(image) {
        this.spriteSheet = image;
    }
    
    // 设置方向
    setDirection(direction) {
        this.direction = direction;
    }
    
    // 开始移动
    startMoving() {
        this.isMoving = true;
    }
    
    // 停止移动
    stopMoving() {
        this.isMoving = false;
    }
    
    // 移动坦克
    move(deltaTime, map) {
        if (!this.isMoving || !this.visible) return;
        
        // 根据方向计算速度
        const velocity = getVelocityFromDirection(this.direction, this.speed);
        
        // 计算新位置
        const newX = this.x + velocity.x * deltaTime / 16;
        const newY = this.y + velocity.y * deltaTime / 16;
        
        // 检查是否可以移动到新位置
        if (this.canMoveTo(newX, this.y, map)) {
            this.x = newX;
        }
        
        if (this.canMoveTo(this.x, newY, map)) {
            this.y = newY;
        }
    }
    
    // 检查是否可以移动到指定位置
    canMoveTo(x, y, map) {
        // 检查边界
        if (x < 0 || x + this.width > CONFIG.CANVAS_WIDTH ||
            y < 0 || y + this.height > CONFIG.CANVAS_HEIGHT) {
            return false;
        }
        
        // 创建新位置的矩形
        const newRect = {
            x: x,
            y: y,
            width: this.width,
            height: this.height
        };
        
        // 检查与地图的碰撞
        return !map.collidesWithTiles(newRect);
    }
    
    // 射击
    shoot() {
        if (!this.visible) return null;
        
        const currentTime = Date.now();
        
        // 检查是否可以射击（冷却时间）
        if (currentTime - this.lastShotTime < this.reloadTime) {
            return null;
        }
        
        // 更新上次射击时间
        this.lastShotTime = currentTime;
        
        // 创建子弹（从坦克中心位置发射）
        const bulletX = this.x + this.width / 2;
        const bulletY = this.y + this.height / 2;
        
        return new Bullet(
            bulletX,
            bulletY,
            this.direction,
            this.bulletSpeed,
            this.bulletDamage,
            this
        );
    }
    
    // 受到伤害
    takeDamage(damage) {
        if (!this.visible) return false;
        
        this.health -= damage;
        
        if (this.health <= 0) {
            this.destroy();
            return true;
        }
        
        return false;
    }
    
    // 摧毁坦克
    destroy() {
        this.visible = false;
    }
    
    // 更新坦克状态
    update(deltaTime, map) {
        if (!this.visible) return;
        
        // 移动坦克
        this.move(deltaTime, map);
    }
    
    // 渲染坦克
    render(ctx) {
        if (!this.visible) return;
        
        // 绘制坦克主体
        ctx.fillStyle = '#999';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 绘制坦克炮塔
        ctx.fillStyle = '#666';
        
        // 根据方向绘制炮管
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const barrelLength = this.width * 0.7;
        const barrelWidth = this.width * 0.2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        
        switch (this.direction) {
            case DIRECTION.UP:
                ctx.rotate(degreesToRadians(0));
                break;
            case DIRECTION.RIGHT:
                ctx.rotate(degreesToRadians(90));
                break;
            case DIRECTION.DOWN:
                ctx.rotate(degreesToRadians(180));
                break;
            case DIRECTION.LEFT:
                ctx.rotate(degreesToRadians(270));
                break;
        }
        
        ctx.fillRect(-barrelWidth / 2, -barrelLength, barrelWidth, barrelLength);
        ctx.restore();
    }
}

// 玩家坦克类
class PlayerTank extends Tank {
    constructor(x, y) {
        super(
            x, y,
            CONFIG.TILE_SIZE, CONFIG.TILE_SIZE,
            CONFIG.PLAYER_SPEED,
            DIRECTION.UP
        );
        
        this.bulletSpeed = CONFIG.PLAYER_BULLET_SPEED;
        this.bulletDamage = CONFIG.PLAYER_BULLET_DAMAGE;
        this.reloadTime = CONFIG.PLAYER_RELOAD_TIME;
    }
    
    // 向上移动
    moveUp() {
        this.setDirection(DIRECTION.UP);
        this.startMoving();
    }
    
    // 向右移动
    moveRight() {
        this.setDirection(DIRECTION.RIGHT);
        this.startMoving();
    }
    
    // 向下移动
    moveDown() {
        this.setDirection(DIRECTION.DOWN);
        this.startMoving();
    }
    
    // 向左移动
    moveLeft() {
        this.setDirection(DIRECTION.LEFT);
        this.startMoving();
    }
    
    // 渲染玩家坦克
    render(ctx) {
        if (!this.visible) return;
        
        // 绘制坦克主体
        ctx.fillStyle = '#0F0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // 绘制坦克炮塔
        ctx.fillStyle = '#080';
        
        // 根据方向绘制炮管
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        const barrelLength = this.width * 0.7;
        const barrelWidth = this.width * 0.2;
        
        ctx.save();
        ctx.translate(centerX, centerY);
        
        switch (this.direction) {
            case DIRECTION.UP:
                ctx.rotate(degreesToRadians(0));
                break;
            case DIRECTION.RIGHT:
                ctx.rotate(degreesToRadians(90));
                break;
            case DIRECTION.DOWN:
                ctx.rotate(degreesToRadians(180));
                break;
            case DIRECTION.LEFT:
                ctx.rotate(degreesToRadians(270));
                break;
        }
        
        ctx.fillRect(-barrelWidth / 2, -barrelLength, barrelWidth, barrelLength);
        ctx.restore();
    }
} 