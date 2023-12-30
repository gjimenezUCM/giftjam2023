
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
    private speed:number;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene: Phaser.Scene, x:number, y:number) {
        super(scene, 9 * 64 - 32, 8 * 64 - 32, 'player');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.speed = 200;
        if (this.scene.input.keyboard!==null){
            this.cursors = this.scene.input.keyboard.createCursorKeys();
        }        
        this.play('down');
    }


    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t:number, dt:number) {
        super.preUpdate(t, dt);
        let dx = 0;
        let dy = 0;
        if (this.cursors.up.isDown) {
            dy = -1;//this.body.setVelocityY(-this.speed);
            this.play('up', true);
        }
        if (this.cursors.down.isDown) {
            dy = 1;//this.body.setVelocityY(this.speed);
            this.play('down', true);
        }
        if (this.cursors.left.isDown) {
            dx = -1;//this.body.setVelocityX(-this.speed);
            this.play('left', true);
        }
        if (this.cursors.right.isDown) {
            dx = 1;//this.body.setVelocityX(this.speed);
            this.play('right', true);
        }
        let vDir = new Phaser.Math.Vector2(dx, dy);
        vDir.normalize().scale(this.speed);
        if (this.body){
            (<Phaser.Physics.Arcade.Body>this.body).setVelocity(vDir.x, vDir.y);
        }
    }

}