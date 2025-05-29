// 精灵基础类
class Sprite {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
    }

    // 更新精灵状态
    update(deltaTime) {
        // 由子类实现
    }

    // 渲染精灵
    render(ctx) {
        // 由子类实现
    }

    // 获取碰撞边界
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    // 检测与其他精灵的碰撞
    collidesWith(other) {
        if (!this.visible || !other.visible) return false;
        return checkCollision(this.getBounds(), other.getBounds());
    }
}

// 动画精灵类
class AnimatedSprite extends Sprite {
    constructor(x, y, width, height, frameWidth, frameHeight, frameCount, frameRate) {
        super(x, y, width, height);

        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.frameCount = frameCount;
        this.frameRate = frameRate; // 帧率（每秒帧数）

        this.frameDuration = 1000 / frameRate; // 每帧持续时间（毫秒）
        this.currentFrame = 0;
        this.frameTimer = 0;

        this.spriteSheet = null;
        this.playing = false;
        this.loop = true;
    }

    // 设置精灵表
    setSpriteSheet(image) {
        this.spriteSheet = image;
    }

    // 播放动画
    play(loop = true) {
        this.playing = true;
        this.loop = loop;
        this.currentFrame = 0;
        this.frameTimer = 0;
    }

    // 停止动画
    stop() {
        this.playing = false;
    }

    // 更新动画
    update(deltaTime) {
        if (!this.playing || !this.spriteSheet) return;

        this.frameTimer += deltaTime;

        if (this.frameTimer >= this.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % this.frameCount;

            // 如果不循环且到达最后一帧，停止动画
            if (!this.loop && this.currentFrame === 0) {
                this.stop();
                this.currentFrame = this.frameCount - 1; // 保持在最后一帧
            }

            this.frameTimer = 0;
        }
    }

    // 渲染动画
    render(ctx) {
        if (!this.visible || !this.spriteSheet) return;

        const frameX = (this.currentFrame % this.frameCount) * this.frameWidth;
        const frameY = Math.floor(this.currentFrame / this.frameCount) * this.frameHeight;

        ctx.drawImage(
            this.spriteSheet,
            frameX, frameY,
            this.frameWidth, this.frameHeight,
            this.x, this.y,
            this.width, this.height
        );
    }
}

// 瓦片精灵类（用于地图元素）
class TileSprite extends Sprite {
    constructor(x, y, size, type) {
        super(x, y, size, size);
        this.type = type;
        this.destructible = this.isDestructible();
        this.passable = this.isPassable();
    }

    // 判断是否可摧毁
    isDestructible() {
        return this.type === TILE_TYPE.BRICK;
    }

    // 判断是否可通过
    isPassable() {
        return this.type === TILE_TYPE.EMPTY || this.type === TILE_TYPE.GRASS;
    }

    // 渲染瓦片
    render(ctx, images) {
        if (!this.visible) return;

        let image;

        switch (this.type) {
            case TILE_TYPE.BRICK:
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case TILE_TYPE.STEEL:
                ctx.fillStyle = '#808080';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case TILE_TYPE.WATER:
                ctx.fillStyle = '#0000FF';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case TILE_TYPE.GRASS:
                ctx.fillStyle = '#00FF00';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case TILE_TYPE.ICE:
                ctx.fillStyle = '#ADD8E6';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                break;
            case TILE_TYPE.BASE:
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(this.x, this.y, this.width, this.height);
                // 绘制基地标志
                ctx.fillStyle = '#FFFF00';
                ctx.beginPath();
                ctx.moveTo(this.x + this.width / 2, this.y + 5);
                ctx.lineTo(this.x + this.width - 5, this.y + this.height - 5);
                ctx.lineTo(this.x + 5, this.y + this.height - 5);
                ctx.closePath();
                ctx.fill();
                break;
            default:
                return; // 空瓦片不渲染
        }
    }
    
    // 摧毁瓦片
    destroy() {
        if (this.destructible) {
            this.type = TILE_TYPE.EMPTY;
            this.destructible = false;
            this.passable = true;
        }
    }
} 