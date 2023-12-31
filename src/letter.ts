import { LetterConfig } from "./configTypes";
import Sentence from "./sentence";
/**
 * Clase que representa una letra
 */
export default class Letter extends Phaser.GameObjects.Sprite {

    /**
     * Coordenadas iniciales (para shake)
     */
    private initX: number;
    private initY: number;

    /**
     * Posición de la letra dentro de la frase
     */
    pos: number;

    /**
     * Margen de variabilidad para el shake
     */
    private maxOffset = 2;
    private minOffset = 1;

    /**
     * Tiempo antes de que empieza a vibrar y cae
     */
    private delayBeforeShakeMs:number;

    /**
     * Timer para el shake
     */
    private shakeTimer: Phaser.Time.TimerEvent;
    /**
     * Tiempo que está activo el shake
     */
    private shakeMs: number;

    /**
     * Controlador al que hay que avisar cuando la letra desaparezca
     */
    private theController: Sentence;


    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene: Phaser.Scene, controller: Sentence, config:LetterConfig) {
        super(scene, config.x, config.y, 'letter');
        this.initX = config.x;
        this.initY = config.y;
        this.shakeMs = config.shakeMs;
        this.pos = config.pos;
        this.theController = controller;

        //Ascii values from 32 to 126.
        this.setFrame(config.theLetter.charCodeAt(0));

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        Phaser.Math.RND.signs = [-1,0,1];
        
        let activateTimer = this.scene.time.addEvent({
            delay: config.delayBeforeShakeMs,
            callback: this.activateShakeAndFall,
            callbackScope: this,
            loop: false
        });
        

    }


    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);

        if (this.y >600){
            this.theController.letterHasFinished(this);
            //this.setActive(false).setVisible(false);
        }


    }

    activateShakeAndFall(){
        this.shakeTimer = this.scene.time.addEvent({
            delay: 50,
            callback: this.shakeNow,
            callbackScope: this,
            loop: true
        });

        let fallTimer = this.scene.time.addEvent({
            delay: this.shakeMs,
            callback: this.fallNow,
            callbackScope: this,
            loop: false
        });
    }

    shakeNow(){
        this.setX(this.initX + Phaser.Math.RND.sign() * Phaser.Math.RND.integerInRange(this.minOffset, this.maxOffset));
        this.setY(this.initY + Phaser.Math.RND.sign() * Phaser.Math.RND.integerInRange(this.minOffset, this.maxOffset));
    }

    fallNow(){
        this.scene.time.removeEvent(this.shakeTimer);
        if (this.body) {
            (<Phaser.Physics.Arcade.Body>this.body).setVelocityY(400);
        }
    }

}