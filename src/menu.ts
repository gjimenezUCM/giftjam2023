
/**
 * Menu
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
    
    private activationKey: Phaser.Input.Keyboard.Key;

    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'menu' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

        let map = this.make.tilemap({
            key: 'tilemap',
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset1 = map.addTilesetImage('wall-floor', 'wallfloor-ts');
        const tileset2 = map.addTilesetImage('screens', 'screens-ts');
        const tileset3 = map.addTilesetImage('office', 'office-ts');
        let deskLayer;
        if (tileset1 && tileset2 && tileset3) {
            map.createLayer('walls', tileset1);
            map.createLayer('floor', tileset1);
            deskLayer = map.createLayer('desks', tileset3);
            let screens = map.createLayer('screens', [tileset2, tileset3]);
            screens?.setDepth(1000);
        }
        


        let title = this.add.text(
            <number>this.game.config.width/2, 2*32,
            '¿Quién tiene el kit?',
            { fontFamily: 'Minecraft', fontSize: 30, color: '#ffffff' });
        title.setOrigin(0.5, 0.5);
        title.setAlign('center');
        title.setDepth(5000);

        let startTextPosX = 5*32;
        let startTextPosY = 6*32;
        let startText = this.add.text(
            startTextPosX, startTextPosY,
            'Empezar',
            { fontFamily: 'Minecraft', fontSize: 24, color: '#2b2f4e' });
        startText.setOrigin(0,0);
        startText.setAlign('left');
        startText.setDepth(5000);

        let startKeySpriteX = startTextPosX + startText.displayWidth + 5;
        let startKeySprite = this.add.existing(new Phaser.GameObjects.Sprite(this, 0, 0, 'startKey'));
        startKeySprite.setScale(2.0, 2.0);
        startKeySprite.setOrigin(0, 0);
        startKeySprite.setPosition(startKeySpriteX, startTextPosY);
        startKeySprite.play("startKey-idle");
        startKeySprite.setDepth(5000);

        // let tutorial = this.add.sprite(600, 600, "tutorial1");
        // tutorial.setDepth(5000);
        // tutorial.play("tutorial1-idle");

        if (this.input.keyboard !== null) {
            this.activationKey = this.input.keyboard.addKey('E');
        }
    }

    update(time: number, dt: number) {
        if (Phaser.Input.Keyboard.JustDown(this.activationKey)) {
            this.scene.start('level');
        }
    }



}