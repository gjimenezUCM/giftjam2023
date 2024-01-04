export default class Explosion extends Phaser.GameObjects.Sprite {
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'dead');
        this.scene.add.existing(this).setDepth(500);
        this.scene.sound.play("dead");
        this.setScale(1.0, 0.7)
        this.play('idle');
        
        this.on('animationcomplete', ()=> {
            this.destroy();
        })
    }
}