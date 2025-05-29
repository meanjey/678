// 子弹类
class Bullet extends Sprite {
    constructor(x, y, direction, speed, damage, owner) {
        // 子弹尺寸
        const size = 8;
        
        // 调整子弹位置，使其从坦克中心发射
        let adjustedX = x - size / 2;
        let adjustedY = y - size / 2;
        
        // 根据方向调整子弹初始位置，使其从坦克炮筒发射
        const offset = owner.width / 2;
        switch (direction) {
            case DIRECTION.UP:
                adjustedY -= offset;
                break;
            case DIRECTION.RIGHT:
                adjustedX += offset;
                break;
            case DIRECTION.DOWN:
                adjustedY += offset;
                break;
            case DIRECTION.LEFT:
                adjustedX -= offset;
                break;
        }
        
        super(adjustedX, adjustedY, size, size);
        
        this.direction = direction;
        this.speed = speed;
        this.damage = damage;
        this.owner = owner; // 发射子弹的坦克
        this.active = true;
    }
    
    // 更新子弹状态
    update(deltaTime) {
        if (!this.active) return;
        
        // 根据方向移动子弹
        const velocity = getVelocityFromDirection(this.direction, this.speed);
        this.x += velocity.x * deltaTime / 16;
        this.y += velocity.y * deltaTime / 16;
        
        // 检查子弹是否超出屏幕边界
        if (this.x < -this.width || this.x > CONFIG.CANVAS_WIDTH ||
            this.y < -this.height || this.y > CONFIG.CANVAS_HEIGHT) {
            this.destroy();
        }
    }
    
    // 渲染子弹
    render(ctx) {
        if (!this.active) return;
        
        ctx.fillStyle = this.owner instanceof PlayerTank ? '#fff' : '#ff0';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    // 处理子弹碰撞
    handleCollision(tanks, map) {
        if (!this.active) return null;
        
        // 检查与坦克的碰撞
        for (const tank of tanks) {
            // 跳过子弹所有者和不可见的坦克
            if (tank === this.owner || !tank.visible) continue;
            
            if (this.collidesWith(tank)) {
                // 坦克受到伤害
                const destroyed = tank.takeDamage(this.damage);
                
                // 子弹销毁
                this.destroy();
                
                // 返回爆炸效果位置和得分
                return {
                    x: this.x,
                    y: this.y,
                    score: destroyed && tank instanceof EnemyTank ? tank.destroy() : 0
                };
            }
        }
        
        // 检查与地图瓦片的碰撞
        const collisionTile = map.bulletCollision(this);
        if (collisionTile) {
            // 子弹销毁
            this.destroy();
            
            // 返回爆炸效果位置
            return {
                x: this.x,
                y: this.y,
                score: 0,
                isBase: collisionTile.type === TILE_TYPE.BASE
            };
        }
        
        return null;
    }
    
    // 销毁子弹
    destroy() {
        this.active = false;
    }
} 