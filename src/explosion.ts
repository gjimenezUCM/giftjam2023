export default class Explosion extends Phaser.GameObjects.Sprite {
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'dead');
        this.scene.add.existing(this);
        this.play('idle');
        this.scene.sound.add("splat").play();
    }
}