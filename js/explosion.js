// 爆炸效果类
class Explosion extends AnimatedSprite {
    constructor(x, y, size = 32) {
        // 创建爆炸动画，4帧，15帧/秒
        super(
            x - size / 2, // 居中显示
            y - size / 2,
            size, size,
            32, 32, // 每帧尺寸
            4, 15 // 帧数和帧率
        );
        
        // 爆炸不循环播放
        this.loop = false;
    }
    
    // 播放爆炸动画
    play() {
        super.play(false); // 不循环
    }
    
    // 检查爆炸动画是否结束
    isFinished() {
        return !this.playing;
    }
}

// 爆炸效果管理器
class ExplosionManager {
    constructor() {
        this.explosions = [];
        this.explosionImage = null;
    }
    
    // 设置爆炸图像
    setExplosionImage(image) {
        this.explosionImage = image;
    }
    
    // 创建爆炸效果
    createExplosion(x, y, size = 32) {
        const explosion = new Explosion(x, y, size);
        
        if (this.explosionImage) {
            explosion.setSpriteSheet(this.explosionImage);
        }
        
        explosion.play();
        this.explosions.push(explosion);
        
        return explosion;
    }
    
    // 更新所有爆炸效果
    update(deltaTime) {
        // 更新每个爆炸效果
        for (const explosion of this.explosions) {
            explosion.update(deltaTime);
        }
        
        // 移除已完成的爆炸效果
        this.explosions = this.explosions.filter(explosion => !explosion.isFinished());
    }
    
    // 渲染所有爆炸效果
    render(ctx) {
        for (const explosion of this.explosions) {
            explosion.render(ctx);
        }
    }
    
    // 清除所有爆炸效果
    clear() {
        this.explosions = [];
    }
} 