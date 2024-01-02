import 'phaser';
 import Boot from './boot';
 import Level from './level';

window.onload = () => {
    let configObject: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        parent: "thegame",
        scale: {
            width: 800,
            height: 600,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        pixelArt: true,
        scene: [Boot, Level],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                debug: true
            }
        },
        seed: ["gramola"]
    };
    
    new Phaser.Game(configObject);
}