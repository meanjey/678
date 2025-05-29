// 游戏常量定义

// 游戏状态
const GAME_STATE = {
    MENU: 0,
    PLAYING: 1,
    PAUSED: 2,
    GAME_OVER: 3
};

// 方向
const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

// 地图元素类型
const TILE_TYPE = {
    EMPTY: 0,
    BRICK: 1,
    STEEL: 2,
    WATER: 3,
    GRASS: 4,
    ICE: 5,
    BASE: 6
};

// 坦克类型
const TANK_TYPE = {
    PLAYER: 0,
    BASIC: 1,
    FAST: 2,
    POWER: 3,
    ARMOR: 4
};

// 游戏配置
const CONFIG = {
    // 画布尺寸
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    
    // 地图配置
    TILE_SIZE: 40,
    MAP_ROWS: 15,
    MAP_COLS: 20,
    
    // 坦克配置
    PLAYER_SPEED: 3,
    PLAYER_BULLET_SPEED: 7,
    PLAYER_BULLET_DAMAGE: 1,
    PLAYER_RELOAD_TIME: 500, // 毫秒
    
    // 敌人配置
    ENEMY_SPAWN_TIME: 3000, // 毫秒
    ENEMY_MAX_COUNT: 5,
    ENEMY_SPEED: {
        [TANK_TYPE.BASIC]: 2,
        [TANK_TYPE.FAST]: 4,
        [TANK_TYPE.POWER]: 2,
        [TANK_TYPE.ARMOR]: 1.5
    },
    ENEMY_BULLET_SPEED: {
        [TANK_TYPE.BASIC]: 5,
        [TANK_TYPE.FAST]: 5,
        [TANK_TYPE.POWER]: 6,
        [TANK_TYPE.ARMOR]: 5
    },
    ENEMY_BULLET_DAMAGE: {
        [TANK_TYPE.BASIC]: 1,
        [TANK_TYPE.FAST]: 1,
        [TANK_TYPE.POWER]: 2,
        [TANK_TYPE.ARMOR]: 1
    },
    ENEMY_RELOAD_TIME: {
        [TANK_TYPE.BASIC]: 1000,
        [TANK_TYPE.FAST]: 1200,
        [TANK_TYPE.POWER]: 1000,
        [TANK_TYPE.ARMOR]: 1500
    },
    ENEMY_HEALTH: {
        [TANK_TYPE.BASIC]: 1,
        [TANK_TYPE.FAST]: 1,
        [TANK_TYPE.POWER]: 1,
        [TANK_TYPE.ARMOR]: 3
    },
    ENEMY_SCORE: {
        [TANK_TYPE.BASIC]: 100,
        [TANK_TYPE.FAST]: 200,
        [TANK_TYPE.POWER]: 300,
        [TANK_TYPE.ARMOR]: 400
    },
    
    // 游戏配置
    PLAYER_LIVES: 3,
    LEVEL_ENEMY_COUNT: 20,
    
    // 碰撞检测
    COLLISION_PADDING: 2
}; 