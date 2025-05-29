// 游戏常量配置
const CONFIG = {
    // 画布尺寸
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    
    // 地图配置
    TILE_SIZE: 32,
    MAP_ROWS: 15,
    MAP_COLS: 20,
    
    // 坦克配置
    PLAYER_SPEED: 3,
    PLAYER_BULLET_SPEED: 8,
    PLAYER_BULLET_DAMAGE: 1,
    PLAYER_RELOAD_TIME: 500, // 毫秒
    PLAYER_LIVES: 3,
    
    // 敌方坦克配置
    ENEMY_SPEED: {
        BASIC: 2,
        FAST: 4,
        POWER: 2,
        ARMOR: 1.5
    },
    ENEMY_BULLET_SPEED: {
        BASIC: 6,
        FAST: 6,
        POWER: 7,
        ARMOR: 5
    },
    ENEMY_BULLET_DAMAGE: {
        BASIC: 1,
        FAST: 1,
        POWER: 2,
        ARMOR: 1
    },
    ENEMY_RELOAD_TIME: {
        BASIC: 1000,
        FAST: 800,
        POWER: 1200,
        ARMOR: 1500
    },
    ENEMY_HEALTH: {
        BASIC: 1,
        FAST: 1,
        POWER: 1,
        ARMOR: 3
    },
    ENEMY_SCORE: {
        BASIC: 100,
        FAST: 200,
        POWER: 300,
        ARMOR: 400
    },
    ENEMY_SPAWN_TIME: 3000, // 毫秒
    ENEMY_MAX_COUNT: 5, // 场上最大敌人数量
    LEVEL_ENEMY_COUNT: 10 // 每关敌人总数
};

// 方向常量
const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

// 坦克类型常量
const TANK_TYPE = {
    BASIC: 'BASIC',
    FAST: 'FAST',
    POWER: 'POWER',
    ARMOR: 'ARMOR'
};

// 瓦片类型常量
const TILE_TYPE = {
    EMPTY: 0,
    BRICK: 1,
    STEEL: 2,
    WATER: 3,
    GRASS: 4,
    ICE: 5,
    BASE: 6
}; 