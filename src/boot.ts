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

    loadFont(name:string, url: string) {
        let newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }

    /**
     * Carga de los assets del juego
     */
    preload() {
        this.loadFont("Minecraft", "/assets/fonts/Minecraftia.ttf");
        this.load.tilemapTiledJSON('tilemap', 'assets/maps/lab.json');
        this.load.audio("dead", "assets/sounds/dead.wav");
        this.load.audio("interactionCompleted", "assets/sounds/interactionCompleted.wav");
        this.load.audio("assignmentCompleted", "assets/sounds/assignmentCompleted.wav");
        this.load.audio('blip', 'assets/sounds/Blip.wav');            
        // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
        this.load.setPath('assets/sprites/');
        this.load.spritesheet('player',
            'player-spritesheet.png',
            { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('letter',
            'bitmapfont32x32.png',
            { frameWidth:32, frameHeight: 32 });
        this.load.spritesheet('dead',
            'dead.png',
            { frameWidth: 64, frameHeight: 64 });            
        this.load.spritesheet('computer',
            'computer.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('loadingBarFrame',
            'loadingBar.png',
            { frameWidth: 16, frameHeight: 32, startFrame:0, endFrame:0 });
        this.load.spritesheet('loadingBarContent',
            'loadingBar.png',
            { frameWidth: 16, frameHeight: 32, startFrame: 3, endFrame: 9 });
        this.load.image('menuBg', 'menu.png');
        this.load.image('wallfloor-ts', 'room/wall-floor.png');
        this.load.image('screens-ts', 'room/screens.png');
        this.load.image('office-ts', 'room/office.png');
        
        this.load.spritesheet('assignBarSide',
            'assignBarSide.png',
            { frameWidth: 6, frameHeight: 8 });
        this.load.spritesheet('assignBarCenter',
            'assignBarCenter.png',
            { frameWidth: 5, frameHeight: 8 });

        this.load.spritesheet('interactionKey',
            'interactionKey.png',
            { frameWidth: 16, frameHeight: 16 });

        this.load.spritesheet('startKey',
            'startKey.png',
            { frameWidth: 16, frameHeight: 16 });
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

        // Animación de la explosión de muerte
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dead', { start: 0, end: 8 }),
            frameRate: 8, // Velocidad de la animación
            hideOnComplete: true
        });

        // Animación de computador activo
        this.anims.create({
            key: 'computer-idle',
            frames: this.anims.generateFrameNumbers('computer', { start: 0, end: 3 }),
            frameRate: 12, // Velocidad de la animación
            repeat: -1,
            yoyo: true
        });
        // Animación de la tecla de interación
        this.anims.create({
            key: 'interactionKey-idle',
            frames: this.anims.generateFrameNumbers('interactionKey', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'startKey-idle',
            frames: this.anims.generateFrameNumbers('startKey', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        // this.anims.create({
        //     key: 'loadingBar-content',
        //     frames: this.anims.generateFrameNumbers('loadingBar', { frames: [8,7,6,5,4,3] })
        // });
        // Para facilitar el comportamiento del shake de las letras
        Phaser.Math.RND.signs = [-1, 0, 1];
        this.scene.start('menu');
    }
}