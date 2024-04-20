import { LevelData } from "./configTypes";
import theTelemetry from './telemetry';

/**
 * Menu
 * @extends Phaser.Scene
 */
export default class Menu extends Phaser.Scene {
    
    private startKey: Phaser.Input.Keyboard.Key;
    private creditsKey: Phaser.Input.Keyboard.Key;

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
        const tileset4 = map.addTilesetImage('floors', 'floors-ts');
        const tileset5 = map.addTilesetImage('baseboards', 'baseboards-ts');
        let deskLayer;
        if (tileset1 && tileset2 && tileset3 && tileset4 && tileset5) {
            map.createLayer('walls', [tileset1, tileset4, tileset5]);
            map.createLayer('floor',[tileset1, tileset4, tileset5]);
            deskLayer = map.createLayer('desks', tileset3);
            map.createLayer('keyboards', [tileset3]);
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

        let startTextPosX = 8*32;
        let startTextPosY = 5*32;
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



        startTextPosY = 6 * 32;
        let creditsText = this.add.text(
            startTextPosX, startTextPosY,
            'Créditos',
            { fontFamily: 'Minecraft', fontSize: 24, color: '#2b2f4e' });
        creditsText.setOrigin(0, 0);
        creditsText.setAlign('left');
        creditsText.setDepth(5000);

        let creditsSpriteX = startTextPosX + creditsText.displayWidth + 5;
        let creditsKeySprite = this.add.existing(new Phaser.GameObjects.Sprite(this, 0, 0, 'creditsKey'));
        creditsKeySprite.setScale(2.0, 2.0);
        creditsKeySprite.setOrigin(0, 0);
        creditsKeySprite.setPosition(creditsSpriteX, startTextPosY);
        creditsKeySprite.play("creditsKey-idle");
        creditsKeySprite.setDepth(5000);        



        if (this.input.keyboard !== null) {
            this.startKey = this.input.keyboard.addKey('E');
            this.creditsKey = this.input.keyboard.addKey('C');
        }
    }

    update(time: number, dt: number) {
        if (Phaser.Input.Keyboard.JustDown(this.startKey)) {
            theTelemetry.trackEvent("GAME:START");
            this.scene.start('level', { 
                nextAssignment: 0,
                assignmentResults: []
            } as LevelData);
        }
        if (Phaser.Input.Keyboard.JustDown(this.creditsKey)) {
            this.scene.start('credits' );
        }
    }



}