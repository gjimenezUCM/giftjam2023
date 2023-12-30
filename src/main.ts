import 'phaser';
 import Boot from './boot';
 import Level from './level';
class PlayGame extends Phaser.Scene {
    image: Phaser.GameObjects.Image;
    constructor() {
        super("PlayGame");
    }
    preload(): void {
        this.load.image('logo', 'assets/phaser3-logo.png');    
    }
    create(): void {
        this.image = this.add.image(400, 300, 'logo');
    }
    update(): void {
        this.image.rotation += 0.01;   
    }
}
window.onload = () => {
    let configObject: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        parent: "thegame",
        scale: {
            width: 768,
            height: 576,
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
    };
    
    new Phaser.Game(configObject);
}