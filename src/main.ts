import 'phaser';
 import Boot from './boot';
 import Level from './level';
 import Menu from './menu';

window.onload = () => {
    let configObject: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        parent: "thegame",
        scale: {
            width: 864,
            height: 704,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        pixelArt: true,
        scene: [Boot, Menu, Level],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                debug: false
            }
        },
        seed: ["gramola"]
    };
    
    new Phaser.Game(configObject);
}