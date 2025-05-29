// 游戏主类
class Game {
    constructor() {
        // 获取画布和上下文
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 游戏状态
        this.isRunning = false;
        this.isPaused = false;
        this.score = 0;
        this.lives = CONFIG.PLAYER_LIVES;
        this.level = 1;
        
        // 游戏元素
        this.map = new GameMap();
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.explosions = new ExplosionManager();
        this.enemySpawner = new EnemySpawner(this.map);
        
        // 游戏时间
        this.lastTime = 0;
        this.accumulator = 0;
        
        // 加载资源
        this.loadAssets();
        
        // 初始化事件监听
        this.initEventListeners();
    }
    
    // 加载游戏资源
    loadAssets() {
        // 这里可以加载图片、音效等资源
        // 暂时使用简单的颜色表示
    }
    
    // 初始化事件监听
    initEventListeners() {
        // 开始按钮
        const startButton = document.getElementById('startButton');
        const startScreenButton = document.getElementById('startScreenButton');
        const restartButton = document.getElementById('restartButton');
        const playAgainButton = document.getElementById('playAgainButton');
        const resumeButton = document.getElementById('resumeButton');
        
        // 开始游戏按钮点击事件
        if (startButton) {
            startButton.addEventListener('click', () => {
                console.log("点击了主界面开始游戏按钮");
                this.startGame();
            });
        }
        
        // 开始界面的开始按钮
        if (startScreenButton) {
            startScreenButton.addEventListener('click', () => {
                console.log("点击了开始界面的开始游戏按钮");
                document.getElementById('startScreen').style.display = 'none';
                this.startGame();
            });
        }
        
        // 重新开始按钮
        if (restartButton) {
            restartButton.addEventListener('click', () => this.restartGame());
        }
        
        // 再玩一次按钮
        if (playAgainButton) {
            playAgainButton.addEventListener('click', () => {
                document.getElementById('gameOverScreen').style.display = 'none';
                this.restartGame();
            });
        }
        
        // 继续游戏按钮
        if (resumeButton) {
            resumeButton.addEventListener('click', () => {
                document.getElementById('pauseScreen').style.display = 'none';
                this.resumeGame();
            });
        }
        
        // 键盘事件
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }
    
    // 处理键盘按下事件
    handleKeyDown(e) {
        if (!this.isRunning || !this.player) return;
        
        switch (e.key) {
            case 'ArrowUp':
                this.player.moveUp();
                break;
            case 'ArrowRight':
                this.player.moveRight();
                break;
            case 'ArrowDown':
                this.player.moveDown();
                break;
            case 'ArrowLeft':
                this.player.moveLeft();
                break;
            case ' ': // 空格键
                const bullet = this.player.shoot();
                if (bullet) {
                    this.bullets.push(bullet);
                }
                break;
            case 'p':
            case 'P':
                this.togglePause();
                break;
        }
    }
    
    // 处理键盘释放事件
    handleKeyUp(e) {
        if (!this.isRunning || !this.player) return;
        
        switch (e.key) {
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':
                this.player.stopMoving();
                break;
        }
    }
    
    // 开始游戏
    startGame() {
        console.log('开始游戏');
        // 隐藏开始按钮，显示重新开始按钮
        const startButton = document.getElementById('startButton');
        const restartButton = document.getElementById('restartButton');
        
        if (startButton) startButton.style.display = 'none';
        if (restartButton) restartButton.style.display = 'inline-block';
        
        // 初始化游戏
        this.initGame();
        
        // 开始游戏循环
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    // 重新开始游戏
    restartGame() {
        // 重置游戏状态
        this.score = 0;
        this.lives = CONFIG.PLAYER_LIVES;
        this.level = 1;
        
        // 更新UI
        this.updateUI();
        
        // 初始化游戏
        this.initGame();
        
        // 开始游戏循环
        this.isRunning = true;
        this.isPaused = false;
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    // 暂停/继续游戏
    togglePause() {
        if (this.isPaused) {
            this.resumeGame();
        } else {
            this.pauseGame();
        }
    }
    
    // 暂停游戏
    pauseGame() {
        this.isPaused = true;
        document.getElementById('pauseScreen').style.display = 'flex';
    }
    
    // 继续游戏
    resumeGame() {
        this.isPaused = false;
        document.getElementById('pauseScreen').style.display = 'none';
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    // 游戏结束
    gameOver() {
        this.isRunning = false;
        
        // 显示游戏结束界面
        const gameOverScreen = document.getElementById('gameOverScreen');
        const finalScore = document.getElementById('finalScore');
        
        if (gameOverScreen) gameOverScreen.style.display = 'flex';
        if (finalScore) finalScore.textContent = this.score;
    }
    
    // 初始化游戏
    initGame() {
        // 加载地图
        this.map.loadMap(this.level);
        
        // 创建玩家坦克
        const basePosition = this.map.getBasePosition();
        this.player = new PlayerTank(
            basePosition.x,
            basePosition.y - CONFIG.TILE_SIZE * 2
        );
        
        // 重置敌人和子弹
        this.enemies = [];
        this.bullets = [];
        this.explosions.clear();
        
        // 设置敌人生成器
        this.enemySpawner.setLevel(this.level);
        
        // 更新UI
        this.updateUI();
    }
    
    // 更新UI
    updateUI() {
        const scoreElement = document.getElementById('score');
        const livesElement = document.getElementById('lives');
        const levelElement = document.getElementById('level');
        
        if (scoreElement) scoreElement.textContent = this.score;
        if (livesElement) livesElement.textContent = this.lives;
        if (levelElement) levelElement.textContent = this.level;
    }
    
    // 游戏主循环
    gameLoop(currentTime) {
        if (!this.isRunning) return;
        if (this.isPaused) return;
        
        // 计算帧间隔时间
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        // 更新游戏状态
        this.update(deltaTime);
        
        // 渲染游戏
        this.render();
        
        // 继续下一帧
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    // 更新游戏状态
    update(deltaTime) {
        // 限制deltaTime，防止卡顿时物理异常
        const dt = Math.min(deltaTime, 32);
        
        // 更新玩家坦克
        if (this.player && this.player.visible) {
            this.player.update(dt, this.map);
        }
        
        // 生成敌人
        const newEnemy = this.enemySpawner.update(dt, this.enemies);
        if (newEnemy) {
            this.enemies.push(newEnemy);
        }
        
        // 更新敌人坦克
        for (const enemy of this.enemies) {
            if (!enemy.visible) continue;
            
            const bullet = enemy.update(dt, this.map, this.player);
            if (bullet) {
                this.bullets.push(bullet);
            }
        }
        
        // 更新子弹
        for (const bullet of this.bullets) {
            bullet.update(dt);
            
            // 检查子弹碰撞
            const collision = bullet.handleCollision([...this.enemies, this.player], this.map);
            if (collision) {
                // 创建爆炸效果
                this.explosions.createExplosion(collision.x, collision.y);
                
                // 增加分数
                if (collision.score > 0) {
                    this.score += collision.score;
                    this.updateUI();
                }
                
                // 检查玩家是否被击中
                if (!this.player.visible) {
                    this.lives--;
                    this.updateUI();
                    
                    if (this.lives <= 0) {
                        // 游戏结束
                        this.gameOver();
                        return;
                    } else {
                        // 重生玩家
                        setTimeout(() => {
                            const basePosition = this.map.getBasePosition();
                            this.player = new PlayerTank(
                                basePosition.x,
                                basePosition.y - CONFIG.TILE_SIZE * 2
                            );
                        }, 1000);
                    }
                }
                
                // 检查基地是否被击中
                if (collision.isBase) {
                    // 游戏结束
                    this.gameOver();
                    return;
                }
            }
        }
        
        // 移除无效的子弹
        this.bullets = this.bullets.filter(bullet => bullet.active);
        
        // 移除无效的敌人
        this.enemies = this.enemies.filter(enemy => enemy.visible);
        
        // 更新爆炸效果
        this.explosions.update(dt);
        
        // 检查关卡是否完成
        if (this.enemies.length === 0 && this.enemySpawner.enemiesSpawned >= this.enemySpawner.maxEnemies) {
            // 进入下一关
            this.level++;
            this.updateUI();
            this.initGame();
        }
    }
    
    // 渲染游戏
    render() {
        // 清空画布
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 渲染地图
        this.map.render(this.ctx);
        
        // 渲染玩家坦克
        if (this.player && this.player.visible) {
            this.player.render(this.ctx);
        }
        
        // 渲染敌人坦克
        for (const enemy of this.enemies) {
            if (enemy.visible) {
                enemy.render(this.ctx);
            }
        }
        
        // 渲染子弹
        for (const bullet of this.bullets) {
            bullet.render(this.ctx);
        }
        
        // 渲染爆炸效果
        this.explosions.render(this.ctx);
    }
} 