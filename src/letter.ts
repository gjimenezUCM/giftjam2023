
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
     * Margen de variabilidad para el shake
     */
    private maxOffset = 2;
    private minOffset = 1;

    /**
     * Timer para el shake
     */
    private shakeTimer: Phaser.Time.TimerEvent;


    /**
     * Retardo antes de empezar a caer
     */
    private delayBeforeFallMs: number;


    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene: Phaser.Scene, x: number, y: number, delayBeforeFallMs: number) {
        super(scene, x, y, 'letter');
        this.initX = x;
        this.initY = y;
        this.delayBeforeFallMs = delayBeforeFallMs;
        this.scale = 4;
        //Ascii values from 32 to 126.
        this.setFrame("¿".charCodeAt(0)-32);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        Phaser.Math.RND.signs = [-1,0,1];

        
        this.shakeTimer = this.scene.time.addEvent({
            delay: 50,
            callback: this.shakeNow,
            callbackScope: this,
            loop: true
        });

        let fallTimer = this.scene.time.addEvent({
            delay: this.delayBeforeFallMs,
            callback: this.fallNow,
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

        if (this.y >400){
            this.setActive(false).setVisible(false);
        }


    }

    shakeNow(){
        this.setX(this.initX+Phaser.Math.RND.sign() * Phaser.Math.RND.integerInRange(this.minOffset, this.maxOffset));
        this.setY(this.initX + Phaser.Math.RND.sign() * Phaser.Math.RND.integerInRange(this.minOffset, this.maxOffset));

    }

    fallNow(){
        this.scene.time.removeEvent(this.shakeTimer);
        if (this.body) {
            (<Phaser.Physics.Arcade.Body>this.body).setVelocityY(400);
        }
    }

}