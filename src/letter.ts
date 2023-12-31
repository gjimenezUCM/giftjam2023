import { LetterConfig } from "./configTypes";
import Sentence from "./sentence";
import Level from "./level";
/**
 * Objeto  que representa una letra que cae. El comportamiento de la letra
 * es el siguiente:
 * 1. Espera "config.delayBeforeShakeMs" antes de empezar a vibrar
 * 2. Vibra durante "config.shakeMs"
 * 3. Cae a una velocidad constante de "config.fallSpeed"
 * 4. Cuando sale de los límites de la ventana, avisa al controlador
 * que la ha creado de que ya ha terminado su recorrido.
 */
export default class Letter extends Phaser.GameObjects.Sprite {

    cfg: LetterConfig;

    /**
     * Margen de variabilidad para el shake
     */
    private maxOffset = 2;
    private minOffset = 1;

    /**
     * Timers para las animaciones
     */
    private activateTimer: Phaser.Time.TimerEvent;
    private shakeTimer: Phaser.Time.TimerEvent;
    private fallTimer: Phaser.Time.TimerEvent;

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
        this.cfg = config
        this.theController = controller;
        this.setFrame(this.cfg.theLetter.charCodeAt(0));
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setVisible(false);
        this.setActive(false);
    }

    onEnable() {
        this.setX(this.cfg.x);
        this.setY(this.cfg.y);
        (<Phaser.Physics.Arcade.Body>this.body).setVelocityY(0);
        this.activateTimer = this.scene.time.addEvent({
            delay: this.cfg.delayBeforeShakeMs,
            callback: this.activateShakeAndFall,
            callbackScope: this,
            loop: false
        });
        this.setActive(true);
        this.setVisible(true);
    }


    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);
        if (this.scene.physics.overlap((<Level>this.scene).player, this)) {
            (<Level>this.scene).onPlayerDead();
        }

        if (this.y >600){
            this.theController.letterHasFinished(this);
        }
    }

    activateShakeAndFall(){
        this.scene.time.removeEvent(this.activateTimer);
        this.shakeTimer = this.scene.time.addEvent({
            delay: 50,
            callback: this.shakeNow,
            callbackScope: this,
            loop: true
        });

        this.fallTimer = this.scene.time.addEvent({
            delay: this.cfg.shakeMs,
            callback: this.fallNow,
            callbackScope: this,
            loop: false
        });
    }

    shakeNow(){
        this.setX(this.cfg.x + Phaser.Math.RND.sign() * Phaser.Math.RND.integerInRange(this.minOffset, this.maxOffset));
        this.setY(this.cfg.y + Phaser.Math.RND.sign() * Phaser.Math.RND.integerInRange(this.minOffset, this.maxOffset));
    }

    fallNow(){
        this.scene.time.removeEvent(this.shakeTimer);
        this.scene.time.removeEvent(this.fallTimer);
        this.setX(this.cfg.x);
        this.setY(this.cfg.y);
        if (this.body) {
            (<Phaser.Physics.Arcade.Body>this.body).setVelocityY(this.cfg.fallSpeed);
        }
    }

}