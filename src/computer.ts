import Assignment from "./assignment";
import Level from "./level";
export default class Computer extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    private static offset = 5;
    private static contentFrames = 6;
    private loadingBarFrame: Phaser.GameObjects.Sprite;
    private loadingBarContent: Phaser.GameObjects.Sprite;
    private totalClicks= 0;
    private currentClicks= 0;
    private activationKey: Phaser.Input.Keyboard.Key;

    private computerState: "WAITING" | "PLAYER_INSIDE" | "PLAYER_LEFT" | "SLEEP";

    private maxTimeWaiting = 10000;
    private maxTimeNoPlayer = 2000;
    private waitingTimer: number;
    private noPlayerTimer: number;

    private manager:Assignment;

    

    
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'computer');
        this.play('computer-idle');
        this.loadingBarFrame = new Phaser.GameObjects.Sprite(this.scene,this.x, this.y, 'loadingBarFrame')
        this.loadingBarContent = new Phaser.GameObjects.Sprite(this.scene, this.x, this.y, 'loadingBarContent')
        this.scene.add.existing(this.loadingBarFrame);
        this.scene.add.existing(this.loadingBarContent);
        if (this.scene.input.keyboard !== null) {
            this.activationKey = this.scene.input.keyboard.addKey('Z');
        }
        this.setVisible(false);

    }

    setAssignmentManager(aManager: Assignment) {
        this.manager = aManager;
    }

    /**
     * Activación del computador
     * @param numberOfClicks Número de clicks necesarios para completar la tarea del computador
     * @param maxTimeWaiting Máximo tiempo que el computador estará activo antes de que el jugador llegue a él
     */
    doWakeUp(numberOfClicks: number = 6, maxTimeWaiting: number = 5000){
        this.setActive(true);
        this.loadingBarFrame.setPosition(this.x + this.width /2 + Computer.offset, this.y); 
        this.loadingBarContent.setPosition(this.x + this.width / 2 + Computer.offset, this.y);
        this.loadingBarContent.setFrame(Computer.contentFrames-1);
        this.loadingBarFrame.setVisible(true);
        this.loadingBarContent.setVisible(true);

        this.currentClicks = 0;
        this.totalClicks = numberOfClicks;
        this.computerState = "WAITING";

        this.waitingTimer = maxTimeWaiting;
        this.setVisible(true);
    }

    /**
     * Desactivación del computador
     */
    doShutdown(){
        this.loadingBarFrame.setVisible(false);
        this.loadingBarContent.setVisible(false);
        this.computerState = "SLEEP";
        this.setActive(false);
        this.setVisible(false);
        this.manager.onComputerShutdown();
    }
    /**
     * Métodos preUpdate de Phaser. 
     * @override
     */
    preUpdate(t: number, dt: number) {
        super.preUpdate(t, dt);

        // Si estamos en el estado WAITING (el jugador no ha pasado aún por aquí),
        // vamos descontando segundos
        if (this.computerState === "WAITING") {
            this.waitingTimer -= dt;
            // Si se ha agotado el tiempo de espera, lo desactivamos (SLEEP)
            if (this.waitingTimer<=0){
                this.doShutdown();
            }
        }

        /// Comprobamos si el jugador entra en el radio de acción del computador
        if (this.scene.physics.overlap((<Level>this.scene).player, this)) {
            // 1. Si estábamos en WAITING pasamos a PLAYER_INSIDE
            if (this.computerState === "WAITING") {
                this.computerState = "PLAYER_INSIDE";
            }
            // 2. Si pulsa la tecla de activación entonces gestionamos el número de click
            // y la barra que muestra las pulsaciones que nos quedan
            if (Phaser.Input.Keyboard.JustDown(this.activationKey)) {
                (<Level>this.scene).clickSound()
                this.currentClicks++;
                let frame = Math.floor((this.currentClicks * Computer.contentFrames) / this.totalClicks);
                frame = Math.min(Computer.contentFrames - 1, frame);
                this.loadingBarContent.setFrame(Computer.contentFrames-frame-1);
                this.checkClicks();
            }
        } else {
            // El jugador no está en el radio de acción del computador
            // 1. Si veníamos de estar en el radio de acción (PLAYER_INSIDE)
            // comenzamos con la cuenta atrás para desactivar el ordenador por
            // inacción
            if (this.computerState === "PLAYER_INSIDE") {
                this.computerState = "PLAYER_LEFT";
                this.noPlayerTimer = this.maxTimeNoPlayer;
            }    
            // 2. Si en el anterior frame estábamos fuera (o se acaba de activar)
            // descontamos el tiempo. 
            // Si se llega a 0 se desactiva el computador (SLEEP) 
            if (this.computerState === "PLAYER_LEFT") {
                this.noPlayerTimer -= dt;
                if (this.noPlayerTimer <= 0) {
                    this.doShutdown();
                }
            }       
        }
    }

    checkClicks() {
        if (this.currentClicks == this.totalClicks) {
            this.manager.onInteractionCompleted();
            this.doShutdown();
        }
    }
}