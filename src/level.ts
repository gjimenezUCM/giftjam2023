
import Player from './player';
import Sentence from './sentence';
import Computer from './computer';
import Assignment from "./assignment";
import { AssignmentResult } from "./configTypes"
import {patterns} from './sentencePatterns';

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
    private assignment: Assignment;

    private activated: boolean;

    private sentence: Sentence;
    private sentencePatterns: Array<Sentence>;
    private currentPattern: number;
    private nextPattern: number;

    private clickSound: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound;
    

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
        this.activated = false;
        let map = this.make.tilemap({
            key: 'tilemap',
            tileWidth: 32,
            tileHeight: 32
        });
        const tileset1 = map.addTilesetImage('wall-floor', 'wallfloor-ts');
        const tileset2 = map.addTilesetImage('screens', 'screens-ts');
        const tileset3 = map.addTilesetImage('office', 'office-ts');
        let deskLayer;
        if (tileset1 && tileset2 && tileset3){
            map.createLayer('walls', tileset1);
            map.createLayer('floor', tileset1);
            deskLayer = map.createLayer('desks', tileset3);
            let screens = map.createLayer('screens', [tileset2, tileset3]);
            screens?.setDepth(1000);
        }
        let desktops = this.physics.add.staticGroup(map.createFromObjects('collisions', [{ name: 'Desktop' }, {name: "wall"}]));
        desktops.toggleVisible();

        this.sentencePatterns = [];
        patterns.forEach( (pattern)=> {
            this.sentencePatterns.push(new Sentence(this, pattern));
        });
        this.currentPattern = this.sentencePatterns.length;
        this.nextPattern = this.sentencePatterns.length;

        this.player = new Player(this);
        this.physics.add.collider(this.player, desktops);
        this.player.setActive(false);

        let computerSet = map.createFromObjects('computers', { name: 'Computer', classType: Computer });
        this.clickSound = this.sound.add("blip");
        this.assignment = new Assignment(
            this,
            8*32+8, 32+4,
            <Array<Computer>>computerSet,
            {
                numIteractions: 5,
                numDays: 15,
                timePerDayMs: 2000,
                maxActiveComputers: 3
            }
        );
        this.time.addEvent({
            delay: 1000,
            callback: this.onStart,
            callbackScope: this,
            loop: false
        });
    }

    onStart() {
        this.assignment.onActivate();
        this.nextPattern = 0;
        this.player.setActive(true);
        this.activated = true;
    }

    update(time:number, dt: number) {
        if (this.activated){
            if (this.currentPattern !== this.nextPattern) {
                this.currentPattern = this.nextPattern;
                this.sentence = this.sentencePatterns[this.currentPattern];
                this.sentence.onActivate();
            }
            this.sentence.preUpdate(time,dt);
            this.assignment.preUpdate(time, dt);
        }
    }

    onPlayerDead() {           
        this.player.onDead();
        this.sentence.setActive(false);
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.scene.start('menu'); },
            callbackScope: this,
            loop: false
        });
    }

    performClick() {
        this.clickSound.detune = Phaser.Math.RND.integerInRange(-300, 300);
        this.clickSound.play();
    }

    onLevelCompleted(result: AssignmentResult) {
        this.player.setActive(false);
        this.sentence.onLevelComplete();
        this.sentence.setActive(false);
        this.time.addEvent({
            delay: 1500,
            callback: () => { this.scene.start('menu'); },
            callbackScope: this,
            loop: false
        });
    }

    onSentenceCompleted() {
        this.nextPattern++;
        if (this.nextPattern === this.sentencePatterns.length) {
            this.nextPattern = 0;
        }
    }

}