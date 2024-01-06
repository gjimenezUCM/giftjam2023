
import Player from './player';
import Sentence from './sentence';
import Computer from './computer';
import Assignment from "./assignment";
import { AssignmentResult, LevelData } from "./configTypes"
import {patterns} from './sentencePatterns';
import { theAssignments } from './assignmentData';

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {


    player: Player;
    private assignment: Assignment;
    private assignmentIndex: number;

    private prevAssignmentResults: Array<AssignmentResult>;

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

    init(data:LevelData) {
        this.assignmentIndex = data.nextAssignment || 0;
        this.prevAssignmentResults = data.assignmentResults;
    }

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
        const tileset4 = map.addTilesetImage('floors', 'floors-ts');
        const tileset5 = map.addTilesetImage('baseboards', 'baseboards-ts');
        let deskLayer;
        if (tileset1 && tileset2 && tileset3 && tileset4 && tileset5) {
            map.createLayer('walls', [tileset1, tileset4, tileset5]);
            map.createLayer('floor', [tileset1, tileset4, tileset5]);
            deskLayer = map.createLayer('desks', tileset3);
            map.createLayer('keyboards', [tileset3]);
            let screens = map.createLayer('screens', [tileset2, tileset3]);
            screens?.setDepth(1000);
        }
        let desktops = this.physics.add.staticGroup(map.createFromObjects('collisions', [{ name: 'Desktop' }, {name: "wall"}]));
        desktops.toggleVisible();

        this.sentencePatterns = [];
        // Seleccionamos los patrones de la práctica asociada
        patterns[this.assignmentIndex].forEach( (pattern)=> {
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
            theAssignments[this.assignmentIndex]
        );

        let guille = this.add.sprite(0, 0, "guille");
        guille.play("guille-idle");
        guille.setScale(2.5);
        guille.setPosition(14 * 32 - 16, 6 * 32);

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
            callback: () => { this.player.onRestart(); },
            callbackScope: this,
            loop: false
        });
    }

    performClick() {
        this.clickSound.detune = Phaser.Math.RND.integerInRange(-300, 300);
        this.clickSound.play();
    }

    onLevelCompleted(result: AssignmentResult) {
        this.sentence.onLevelComplete();
        this.sentence.setActive(false);
        if (result.resultType =="FAIL") {
            this.player.onDead();
        }
        this.time.addEvent({
            delay: 1500,
            callback: () => { this.resolveNextLevel(result); },
            callbackScope: this,
            loop: false
        });
    }

    resolveNextLevel(result: AssignmentResult) {
        this.assignmentIndex++;
        this.prevAssignmentResults.push(result)

        // Si hemos terminado porque:
        // 1. No se ha pasado este nivel
        // 2. Se han completado todos los niveles
        if ( result.resultType==="FAIL" ||
             this.assignmentIndex === theAssignments.length) {
            // Mostramos la escena de final
            this.scene.start('final', {
                globalGrade: result.resultType,
                assignmentResults: this.prevAssignmentResults
            });
        } else {
            // Hemos completado el nivel pero aún quedan más
            this.scene.start('level', { 
                nextAssignment: this.assignmentIndex,
                assignmentResults: this.prevAssignmentResults
            });
        }
    }

    onSentenceCompleted() {
        this.nextPattern++;
        if (this.nextPattern === this.sentencePatterns.length) {
            this.nextPattern = 0;
        }
    }

}