/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {

    private frameRate:number = 12;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'boot' });
    }

    /**
     * Carga de los assets del juego
     */
    preload() {
        //this.load.tilemapTiledJSON('tilemap', 'assets/map/level.json');
        //this.load.audio("splat", "assets/sound/splat.mp3");
        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        this.load.setPath('assets/sprites/');
        this.load.spritesheet('player',
            'player-spritesheet.png',
            { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('letter',
            'bitmapfont32x32.png',
            { frameWidth:32, frameHeight: 32 });
            // 'bitmapfont.png',
            // { frameWidth: 5, frameHeight: 12 });
        //this.load.image('tilesheet', 'sokoban_tilesheet.png');
        //this.load.image('goal', 'time_zone.png');
        //this.load.image('blood', 'blood.png');
        // this.load.spritesheet('sawblade2',
        //     'sawblade2.png',
        //     { frameWidth: 64, frameHeight: 64 });
        // this.load.spritesheet('sawblade',
        //     'sawblade.png',
        //     { frameWidth: 64, frameHeight: 64 });
        // this.load.spritesheet('door',
        //     'door.png',
        //     { frameWidth: 64, frameHeight: 64 });
    }

    /**
     * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
     * nivel del juego
     */
    create() {
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5 }),
            frameRate: this.frameRate, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
            frameRate: this.frameRate, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 11 }),
            frameRate: this.frameRate, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 18, end: 23 }),
            frameRate: this.frameRate, // Velocidad de la animación
            repeat: -1    // Animación en bucle
        });
        this.scene.start('level');
    }
}