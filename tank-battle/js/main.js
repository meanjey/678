// 等待文档加载完成
document.addEventListener('DOMContentLoaded', () => {
    console.log('游戏初始化中...');
    
    // 创建游戏实例
    const game = new Game();
    
    // 将游戏实例暴露到全局，方便调试
    window.game = game;
    
    console.log('游戏初始化完成');
}); 