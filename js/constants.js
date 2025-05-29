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
    
    // 坦克升级配置
    PLAYER_MAX_LEVEL: 3,
    PLAYER_LEVEL_SPEEDS: [3, 3.5, 4],
    PLAYER_LEVEL_BULLET_SPEEDS: [8, 9, 10],
    PLAYER_LEVEL_BULLET_DAMAGES: [1, 1.5, 2],
    PLAYER_LEVEL_RELOAD_TIMES: [500, 400, 300],
    
    // 敌方坦克配置
    ENEMY_SPEED: {
        BASIC: 2,
        FAST: 4,
        POWER: 2,
        ARMOR: 1.5,
        BOSS: 1.2
    },
    ENEMY_BULLET_SPEED: {
        BASIC: 6,
        FAST: 6,
        POWER: 7,
        ARMOR: 5,
        BOSS: 6
    },
    ENEMY_BULLET_DAMAGE: {
        BASIC: 1,
        FAST: 1,
        POWER: 2,
        ARMOR: 1,
        BOSS: 3
    },
    ENEMY_RELOAD_TIME: {
        BASIC: 1000,
        FAST: 800,
        POWER: 1200,
        ARMOR: 1500,
        BOSS: 2000
    },
    ENEMY_HEALTH: {
        BASIC: 1,
        FAST: 1,
        POWER: 1,
        ARMOR: 3,
        BOSS: 10
    },
    ENEMY_SCORE: {
        BASIC: 100,
        FAST: 200,
        POWER: 300,
        ARMOR: 400,
        BOSS: 1000
    },
    ENEMY_SPAWN_TIME: 3000, // 毫秒
    ENEMY_MAX_COUNT: 5, // 场上最大敌人数量
    LEVEL_ENEMY_COUNT: 10, // 每关敌人总数
    BOSS_LEVEL_INTERVAL: 5, // 每隔多少关出现boss
    
    // 道具配置
    POWERUP_TYPES: {
        HEALTH: 0,
        SHIELD: 1,
        SPEED: 2,
        DAMAGE: 3,
        RAPID_FIRE: 4,
        BOMB: 5
    },
    POWERUP_DURATION: 10000, // 道具持续时间（毫秒）
    POWERUP_SPAWN_CHANCE: 0.3, // 敌人死亡时掉落道具的概率
    
    // 特效配置
    EXPLOSION_SIZES: {
        SMALL: 24,
        MEDIUM: 32,
        LARGE: 48
    },
    SCREEN_SHAKE_DURATION: 300, // 屏幕震动持续时间（毫秒）
    SCREEN_SHAKE_INTENSITY: 5, // 屏幕震动强度
    
    // 游戏关卡配置
    LEVEL_BACKGROUNDS: [
        'desert', // 沙漠
        'snow',   // 雪地
        'city',   // 城市
        'forest', // 森林
        'night'   // 夜晚
    ],
    
    // 音效配置
    SOUND_ENABLED: true,
    MUSIC_ENABLED: true,
    
    // 移动端控制配置
    TOUCH_ENABLED: true,
    VIRTUAL_JOYSTICK_SIZE: 100,
    VIRTUAL_BUTTON_SIZE: 60,
    TOUCH_OPACITY: 0.5
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
    ARMOR: 'ARMOR',
    BOSS: 'BOSS'
};

// 瓦片类型常量
const TILE_TYPE = {
    EMPTY: 0,
    BRICK: 1,
    STEEL: 2,
    WATER: 3,
    GRASS: 4,
    ICE: 5,
    BASE: 6,
    CRACKED_BRICK: 7 // 可被多次击中的砖墙
};

// 游戏状态常量
const GAME_STATE = {
    MENU: 0,
    PLAYING: 1,
    PAUSED: 2,
    GAME_OVER: 3,
    LEVEL_COMPLETE: 4
};

// 特效类型常量
const EFFECT_TYPE = {
    EXPLOSION: 0,
    SHIELD: 1,
    SPAWN: 2,
    POWERUP: 3,
    HIT: 4
};

// 音效类型常量
const SOUND_TYPE = {
    SHOOT: 'shoot',
    EXPLOSION: 'explosion',
    HIT: 'hit',
    POWERUP: 'powerup',
    MOVE: 'move',
    GAME_START: 'game_start',
    GAME_OVER: 'game_over',
    LEVEL_COMPLETE: 'level_complete'
}; 