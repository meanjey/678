// 敌方坦克类
class EnemyTank extends Tank {
    constructor(x, y, type = TANK_TYPE.BASIC) {
        super(
            x, y,
            CONFIG.TILE_SIZE, CONFIG.TILE_SIZE,
            CONFIG.ENEMY_SPEED[type],
            DIRECTION.DOWN
        );
        
        this.type = type;
        this.bulletSpeed = CONFIG.ENEMY_BULLET_SPEED[type];
        this.bulletDamage = CONFIG.ENEMY_BULLET_DAMAGE[type];
        this.reloadTime = CONFIG.ENEMY_RELOAD_TIME[type];
        
        this.health = CONFIG.ENEMY_HEALTH[type];
        this.maxHealth = CONFIG.ENEMY_HEALTH[type];
        
        // AI决策相关
        this.thinkTime = 0;
        this.thinkInterval = getRandomInt(1000, 3000); // 思考间隔（毫秒）
        this.directionChangeTime = 0;
        this.directionChangeDuration = getRandomInt(1000, 3000); // 方向持续时间（毫秒）
        this.shootProbability = 0.1; // 每次思考时射击的概率
        
        // 初始化移动
        this.startMoving();
    }
    
    // 设置敌方坦克类型
    setType(type) {
        this.type = type;
        this.speed = CONFIG.ENEMY_SPEED[type];
        this.bulletSpeed = CONFIG.ENEMY_BULLET_SPEED[type];
        this.bulletDamage = CONFIG.ENEMY_BULLET_DAMAGE[type];
        this.reloadTime = CONFIG.ENEMY_RELOAD_TIME[type];
        this.health = CONFIG.ENEMY_HEALTH[type];
        this.maxHealth = CONFIG.ENEMY_HEALTH[type];
    }
    
    // AI决策
    think(deltaTime, playerTank, map) {
        this.thinkTime += deltaTime;
        this.directionChangeTime += deltaTime;
        
        // 是否需要改变方向
        if (this.directionChangeTime >= this.directionChangeDuration) {
            // 随机选择新方向
            if (Math.random() < 0.7) {
                // 70%概率随机选择方向
                this.setDirection(getRandomDirection());
            } else if (playerTank && playerTank.visible) {
                // 30%概率朝向玩家
                this.setDirectionTowardsPlayer(playerTank);
            }
            
            this.directionChangeTime = 0;
            this.directionChangeDuration = getRandomInt(1000, 3000);
        }
        
        // 检查当前方向是否可行，如果不可行则改变方向
        if (this.isStuck(map)) {
            this.setDirection(getRandomDirection());
        }
        
        // 是否射击
        if (this.thinkTime >= this.thinkInterval) {
            this.thinkTime = 0;
            this.thinkInterval = getRandomInt(1000, 3000);
            
            // 根据概率决定是否射击
            if (Math.random() < this.shootProbability) {
                return this.shoot();
            }
        }
        
        return null;
    }
    
    // 检查坦克是否卡住（无法移动）
    isStuck(map) {
        const velocity = getVelocityFromDirection(this.direction, this.speed);
        const newX = this.x + velocity.x;
        const newY = this.y + velocity.y;
        
        return !this.canMoveTo(newX, newY, map);
    }
    
    // 设置朝向玩家的方向
    setDirectionTowardsPlayer(playerTank) {
        const dx = playerTank.x - this.x;
        const dy = playerTank.y - this.y;
        
        // 根据玩家相对位置决定方向
        if (Math.abs(dx) > Math.abs(dy)) {
            // 水平方向距离更大
            this.setDirection(dx > 0 ? DIRECTION.RIGHT : DIRECTION.LEFT);
        } else {
            // 垂直方向距离更大
            this.setDirection(dy > 0 ? DIRECTION.DOWN : DIRECTION.UP);
        }
    }
    
    // 更新敌方坦克状态
    update(deltaTime, map, playerTank) {
        // AI决策
        const bullet = this.think(deltaTime, playerTank, map);
        
        // 更新坦克状态
        super.update(deltaTime, map);
        
        return bullet;
    }
    
    // 摧毁敌方坦克
    destroy() {
        super.destroy();
        return CONFIG.ENEMY_SCORE[this.type]; // 返回击毁该坦克获得的分数
    }
}

// 敌方坦克生成器
class EnemySpawner {
    constructor(map) {
        this.map = map;
        this.spawnPoints = [
            { x: 0, y: 0 },
            { x: CONFIG.CANVAS_WIDTH - CONFIG.TILE_SIZE, y: 0 },
            { x: CONFIG.CANVAS_WIDTH / 2 - CONFIG.TILE_SIZE / 2, y: 0 }
        ];
        this.spawnTimer = 0;
        this.enemiesSpawned = 0;
        this.maxEnemies = CONFIG.LEVEL_ENEMY_COUNT;
    }
    
    // 更新生成器状态
    update(deltaTime, activeEnemies) {
        if (this.enemiesSpawned >= this.maxEnemies) {
            return null; // 已经生成了足够的敌人
        }
        
        if (activeEnemies.length >= CONFIG.ENEMY_MAX_COUNT) {
            return null; // 当前敌人数量已达上限
        }
        
        this.spawnTimer += deltaTime;
        
        if (this.spawnTimer >= CONFIG.ENEMY_SPAWN_TIME) {
            this.spawnTimer = 0;
            return this.spawnEnemy();
        }
        
        return null;
    }
    
    // 生成敌方坦克
    spawnEnemy() {
        // 随机选择生成点
        const spawnPoint = this.spawnPoints[getRandomInt(0, this.spawnPoints.length - 1)];
        
        // 随机选择坦克类型（基于关卡难度）
        let tankType;
        const rand = Math.random();
        
        if (rand < 0.5) {
            tankType = TANK_TYPE.BASIC;
        } else if (rand < 0.7) {
            tankType = TANK_TYPE.FAST;
        } else if (rand < 0.9) {
            tankType = TANK_TYPE.POWER;
        } else {
            tankType = TANK_TYPE.ARMOR;
        }
        
        // 创建敌方坦克
        const enemy = new EnemyTank(spawnPoint.x, spawnPoint.y, tankType);
        
        // 增加已生成敌人计数
        this.enemiesSpawned++;
        
        return enemy;
    }
    
    // 设置关卡
    setLevel(level) {
        this.enemiesSpawned = 0;
        this.maxEnemies = CONFIG.LEVEL_ENEMY_COUNT + (level - 1) * 5; // 每关增加5个敌人
    }
} 