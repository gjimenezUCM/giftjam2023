import Explosion from "./explosion";
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
    private speed:number;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    isDead = false;
    private initX: number;
    private initY: number;
    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene: Phaser.Scene) {
        let x = <number>scene.game.config.width / 2;
        let y = 2*32 + (<number>scene.game.config.height / 2) - 16;
        super( scene,
               x, 
               y,
               'player');
        this.initX = x;
        this.initY = y;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(1.0, 2/3);
        this.setDepth(800);
        let halfHeight = (<Phaser.Physics.Arcade.Body>this.body).halfHeight;
        let halfWidth = (<Phaser.Physics.Arcade.Body>this.body).halfWidth;
        (<Phaser.Physics.Arcade.Body>this.body).setCircle(halfWidth, 0, halfHeight - halfWidth);
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
            dy = -1;
        }
        if (this.cursors.down.isDown) {
            dy = 1;
        }
        if (this.cursors.left.isDown) {
            dx = -1;
        }
        if (this.cursors.right.isDown) {
            dx = 1;
        }
        if (dy===0) {
            if (dx===1) {
                this.play('right', true);
            } else if (dx===-1) {
                this.play('left', true);  
            } 
        } else {
            if (dy === -1) {
                this.play('up', true);
            } else {
                this.play('down', true);
            }
        }
        let vDir = new Phaser.Math.Vector2(dx, dy);
        vDir.normalize().scale(this.speed);
        if (this.body){
            (<Phaser.Physics.Arcade.Body>this.body).setVelocity(vDir.x, vDir.y);
        }
    }

    onDead() {
        // Eliminamos las colisiones con el jugador
        (<Phaser.Physics.Arcade.Body>this.body).checkCollision.none = true;
        new Explosion(this.scene, this.x, this.y);
        this.setVisible(false);
        this.setActive(false);
    }

    onRestart() {
        // Volvemos a poner las colisiones al jugador
        (<Phaser.Physics.Arcade.Body>this.body).checkCollision.none = false;
        this.setVisible(true);
        this.setActive(true);
        this.setPosition(this.initX, this.initY);   
        this.play('down');    
    }

}