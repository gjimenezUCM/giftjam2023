
import Player from './player';
import Letter from './letter';
import Sentence from './sentence';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {


    player:Player;
    private sentence: Sentence;
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
        this.player = new Player(this, 0,0);
        this.sentence = new Sentence(this, {
            sentence: " ¿Quién  tiene  el  kit? ",
            y: 100,
            /**
             * Parámetros por defecto
             */
            delayBeforeShakeMs: 2000,
            shakeMs: 1500,
            fallSpeed: 400,
            custom: [
                {
                    range: "9-13",
                    delayBeforeShakeMs: 3000,                  
                },
                {
                    range: "16-17",
                    delayBeforeShakeMs: 4000,
                },
                {
                    range: "20-23",
                    delayBeforeShakeMs: 5000,
                },                  
            ]
        });
        // this.physics.add.collider(this.player, this.groundLayer);
        // this.discGroup = this.add.group();
        // this.discGroup.add(new EdgeDisc(this));
        // //this.discGroup.add(new BouncingDisc(this, 400, 300));
        // this.physics.add.overlap(this.player, this.discGroup, (player, disc) => disc.onCollision(player));
        // this.physics.add.overlap(this.player, this.door, (player, door) => door.onOverlap());
        // //this.physics.add.collider(this.discGroup, this.groundLayer);


    }

    update(time:number, dt: number) {
        this.sentence.preUpdate(time,dt);
    }

    onPlayerDead() {
            console.log("Lo maté");            
            this.player.onDead();
    }

}