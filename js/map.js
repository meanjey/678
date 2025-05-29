// 地图类
class GameMap {
    constructor() {
        this.rows = CONFIG.MAP_ROWS;
        this.cols = CONFIG.MAP_COLS;
        this.tileSize = CONFIG.TILE_SIZE;
        
        // 初始化地图瓦片
        this.tiles = [];
        this.initEmptyMap();
        
        // 地图图像资源
        this.images = null;
    }
    
    // 设置地图图像资源
    setImages(images) {
        this.images = images;
    }
    
    // 初始化空地图
    initEmptyMap() {
        this.tiles = [];
        
        for (let row = 0; row < this.rows; row++) {
            const rowTiles = [];
            
            for (let col = 0; col < this.cols; col++) {
                const x = col * this.tileSize;
                const y = row * this.tileSize;
                
                // 创建空瓦片
                const tile = new TileSprite(x, y, this.tileSize, TILE_TYPE.EMPTY);
                rowTiles.push(tile);
            }
            
            this.tiles.push(rowTiles);
        }
    }
    
    // 加载地图
    loadMap(level) {
        // 先初始化空地图
        this.initEmptyMap();
        
        // 根据关卡生成地图
        switch (level) {
            case 1:
                this.generateLevel1();
                break;
            case 2:
                this.generateLevel2();
                break;
            case 3:
                this.generateLevel3();
                break;
            default:
                this.generateRandomMap();
                break;
        }
        
        // 添加基地和周围的钢墙
        this.addBase();
    }
    
    // 生成第一关地图
    generateLevel1() {
        // 添加一些砖墙
        for (let col = 2; col < this.cols - 2; col += 2) {
            this.setTile(2, col, TILE_TYPE.BRICK);
            this.setTile(this.rows - 3, col, TILE_TYPE.BRICK);
        }
        
        // 添加垂直砖墙
        for (let row = 4; row < this.rows - 4; row += 2) {
            this.setTile(row, 4, TILE_TYPE.BRICK);
            this.setTile(row, this.cols - 5, TILE_TYPE.BRICK);
        }
        
        // 添加一些钢墙
        this.setTile(7, 7, TILE_TYPE.STEEL);
        this.setTile(7, this.cols - 8, TILE_TYPE.STEEL);
        
        // 添加水域
        for (let col = 8; col < this.cols - 8; col++) {
            this.setTile(10, col, TILE_TYPE.WATER);
        }
        
        // 添加草地
        for (let row = 5; row < 8; row++) {
            for (let col = 9; col < 12; col++) {
                this.setTile(row, col, TILE_TYPE.GRASS);
            }
        }
    }
    
    // 生成第二关地图
    generateLevel2() {
        // 添加更多的砖墙，形成迷宫
        for (let col = 1; col < this.cols - 1; col += 2) {
            for (let row = 1; row < this.rows - 5; row += 2) {
                this.setTile(row, col, TILE_TYPE.BRICK);
            }
        }
        
        // 添加一些钢墙作为障碍
        this.setTile(3, 3, TILE_TYPE.STEEL);
        this.setTile(3, this.cols - 4, TILE_TYPE.STEEL);
        this.setTile(8, 8, TILE_TYPE.STEEL);
        this.setTile(8, this.cols - 9, TILE_TYPE.STEEL);
        
        // 添加水域
        for (let col = 5; col < this.cols - 5; col++) {
            this.setTile(5, col, TILE_TYPE.WATER);
        }
        
        // 添加冰面
        for (let row = 10; row < 12; row++) {
            for (let col = 3; col < 7; col++) {
                this.setTile(row, col, TILE_TYPE.ICE);
            }
        }
        
        // 添加草地
        for (let row = 7; row < 10; row++) {
            for (let col = 12; col < 16; col++) {
                this.setTile(row, col, TILE_TYPE.GRASS);
            }
        }
    }
    
    // 生成第三关地图
    generateLevel3() {
        // 添加大量钢墙，增加难度
        for (let col = 2; col < this.cols - 2; col += 4) {
            this.setTile(3, col, TILE_TYPE.STEEL);
            this.setTile(this.rows - 6, col + 2, TILE_TYPE.STEEL);
        }
        
        // 添加砖墙迷宫
        for (let row = 5; row < this.rows - 5; row += 2) {
            for (let col = 1; col < this.cols - 1; col += 3) {
                this.setTile(row, col, TILE_TYPE.BRICK);
                if (col + 1 < this.cols - 1) {
                    this.setTile(row, col + 1, TILE_TYPE.BRICK);
                }
            }
        }
        
        // 添加水域
        for (let col = 3; col < 8; col++) {
            this.setTile(8, col, TILE_TYPE.WATER);
        }
        for (let col = this.cols - 8; col < this.cols - 3; col++) {
            this.setTile(8, col, TILE_TYPE.WATER);
        }
        
        // 添加冰面
        for (let row = 10; row < 12; row++) {
            for (let col = 8; col < this.cols - 8; col++) {
                this.setTile(row, col, TILE_TYPE.ICE);
            }
        }
        
        // 添加草地
        for (let row = 2; row < 5; row++) {
            for (let col = 8; col < 12; col++) {
                this.setTile(row, col, TILE_TYPE.GRASS);
            }
        }
    }
    
    // 生成随机地图
    generateRandomMap() {
        // 随机添加砖墙
        for (let i = 0; i < this.rows * this.cols / 5; i++) {
            const row = getRandomInt(1, this.rows - 6);
            const col = getRandomInt(1, this.cols - 2);
            this.setTile(row, col, TILE_TYPE.BRICK);
        }
        
        // 随机添加钢墙
        for (let i = 0; i < this.rows * this.cols / 20; i++) {
            const row = getRandomInt(1, this.rows - 6);
            const col = getRandomInt(1, this.cols - 2);
            this.setTile(row, col, TILE_TYPE.STEEL);
        }
        
        // 随机添加水域
        for (let i = 0; i < this.rows * this.cols / 25; i++) {
            const row = getRandomInt(5, this.rows - 6);
            const col = getRandomInt(1, this.cols - 2);
            this.setTile(row, col, TILE_TYPE.WATER);
        }
        
        // 随机添加草地
        for (let i = 0; i < this.rows * this.cols / 15; i++) {
            const row = getRandomInt(1, this.rows - 6);
            const col = getRandomInt(1, this.cols - 2);
            this.setTile(row, col, TILE_TYPE.GRASS);
        }
        
        // 随机添加冰面
        for (let i = 0; i < this.rows * this.cols / 30; i++) {
            const row = getRandomInt(1, this.rows - 6);
            const col = getRandomInt(1, this.cols - 2);
            this.setTile(row, col, TILE_TYPE.ICE);
        }
    }
    
    // 添加基地和保护墙
    addBase() {
        // 基地位置（地图底部中央）
        const baseRow = this.rows - 2;
        const baseCol = Math.floor(this.cols / 2);
        
        // 设置基地
        this.setTile(baseRow, baseCol, TILE_TYPE.BASE);
        
        // 添加保护基地的钢墙
        this.setTile(baseRow - 1, baseCol - 1, TILE_TYPE.STEEL);
        this.setTile(baseRow - 1, baseCol, TILE_TYPE.STEEL);
        this.setTile(baseRow - 1, baseCol + 1, TILE_TYPE.STEEL);
        this.setTile(baseRow, baseCol - 1, TILE_TYPE.STEEL);
        this.setTile(baseRow, baseCol + 1, TILE_TYPE.STEEL);
    }
    
    // 设置指定位置的瓦片类型
    setTile(row, col, tileType) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            const tile = this.tiles[row][col];
            tile.type = tileType;
            tile.destructible = tile.isDestructible();
            tile.passable = tile.isPassable();
        }
    }
    
    // 获取指定位置的瓦片
    getTile(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.tiles[row][col];
        }
        return null;
    }
    
    // 获取基地位置
    getBasePosition() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.tiles[row][col].type === TILE_TYPE.BASE) {
                    return {
                        x: col * this.tileSize,
                        y: row * this.tileSize
                    };
                }
            }
        }
        
        // 默认位置（地图底部中央）
        return {
            x: Math.floor(this.cols / 2) * this.tileSize,
            y: (this.rows - 2) * this.tileSize
        };
    }
    
    // 检测与地图瓦片的碰撞
    collidesWithTiles(rect) {
        // 计算矩形覆盖的瓦片范围
        const startRow = Math.max(0, Math.floor(rect.y / this.tileSize));
        const endRow = Math.min(this.rows - 1, Math.floor((rect.y + rect.height - 1) / this.tileSize));
        const startCol = Math.max(0, Math.floor(rect.x / this.tileSize));
        const endCol = Math.min(this.cols - 1, Math.floor((rect.x + rect.width - 1) / this.tileSize));
        
        // 检查每个瓦片
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const tile = this.tiles[row][col];
                
                // 如果瓦片不可通过，则发生碰撞
                if (!tile.passable) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    // 处理子弹与地图的碰撞
    bulletCollision(bullet) {
        // 计算子弹覆盖的瓦片范围
        const startRow = Math.max(0, Math.floor(bullet.y / this.tileSize));
        const endRow = Math.min(this.rows - 1, Math.floor((bullet.y + bullet.height - 1) / this.tileSize));
        const startCol = Math.max(0, Math.floor(bullet.x / this.tileSize));
        const endCol = Math.min(this.cols - 1, Math.floor((bullet.x + bullet.width - 1) / this.tileSize));
        
        // 检查每个瓦片
        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                const tile = this.tiles[row][col];
                
                // 跳过可通过的瓦片（空地和草地）
                if (tile.type === TILE_TYPE.EMPTY || tile.type === TILE_TYPE.GRASS) {
                    continue;
                }
                
                // 如果是可摧毁的瓦片（砖墙），尝试摧毁
                if (tile.destructible) {
                    tile.destroy();
                    return tile;
                }
                
                // 如果是基地，游戏结束
                if (tile.type === TILE_TYPE.BASE) {
                    return tile;
                }
                
                // 其他不可摧毁的瓦片（钢墙、水），子弹被阻挡
                if (!tile.passable) {
                    return tile;
                }
            }
        }
        
        return null;
    }
    
    // 渲染地图
    render(ctx) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const tile = this.tiles[row][col];
                tile.render(ctx, this.images);
            }
        }
    }
} 