
import Player from './player';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {


    private player:Player;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level' });
    }

    // init(data) {
    //     this.spawnTime = data.spawnTime;
    //     this.discSpeed = data.discSpeed;
    //     this.goalTime = data.goalTime;
    // }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        // this.map = this.make.tilemap({
        //     key: 'tilemap',
        //     tileWidth: 64,
        //     tileHeight: 64
        // });
        // const tileset1 = this.map.addTilesetImage('level_tileset', 'tilesheet');
        // this.groundLayer = this.map.createLayer('ground', tileset1);
        // this.groundLayer.setCollisionByProperty({ collision: true });
        // this.door = new Door(this);
        // this.goal = new Goal(this, this.goalTime, this.door);
        this.player = new Player(this, 200, 200);
        // this.physics.add.collider(this.player, this.groundLayer);
        // this.discGroup = this.add.group();
        // this.discGroup.add(new EdgeDisc(this));
        // //this.discGroup.add(new BouncingDisc(this, 400, 300));
        // this.physics.add.overlap(this.player, this.discGroup, (player, disc) => disc.onCollision(player));
        // this.physics.add.overlap(this.player, this.door, (player, door) => door.onOverlap());
        // //this.physics.add.collider(this.discGroup, this.groundLayer);

        // this.splat = this.sound.add("splat");

        // let timer = this.time.addEvent({
        //     delay: this.spawnTime,
        //     callback: this.spawnDisc,
        //     callbackScope: this,
        //     loop: true
        // });
    }

    // playSplat() {
    //     this.splat.play();
    //     this.splat.once("complete", () => {
    //         this.scene.start('menu');
    //     });
    // }

    // spawnDisc() {
    //     this.discGroup.add(new BouncingDisc(this, Phaser.Math.RND.integerInRange(3 * 64 + 32, 8 * 64 + 32), Phaser.Math.RND.integerInRange(2 * 64 + 32, 7 * 64 + 32), this.discSpeed));
    // }

}