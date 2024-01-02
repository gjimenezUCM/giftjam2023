import Computer from './computer';
import { AssignmentConfig } from './configTypes';
export default class Assignment {

    private cfg: AssignmentConfig;

    /**
     * Computadores. Nos avisarán de cuando el jugador ha completado una
     * interacción con ellos. Nos encargaremos de activarlos/desactivarlos
     */
    private computers: Phaser.GameObjects.Group;

    /**
     * Escena de Phaser. Para avisar de si se ha conseguido o no completar
     * la práctica
     */
    private scene: Phaser.Scene;

    private currentActiveComputers = 0;
    private currentDays = 0;
    private theTimer = 0;
    private numInteractions = 0;

    private static interactionCompleted: Phaser.Sound.HTML5AudioSound;
    private static assignmentCompleted: Phaser.Sound.HTML5AudioSound;


    constructor(scene: Phaser.Scene, computerSet: Array<Computer>, config: AssignmentConfig) {
        this.scene = scene;
        this.cfg = config;
        this.computers = this.scene.physics.add.group(computerSet);
        for (let computer of this.computers.getChildren()) {
            (<Computer>computer).setAssignmentManager(this);
            (<Computer>computer).doShutdown();
        }
        this.currentActiveComputers = 0;
        Assignment.interactionCompleted = <Phaser.Sound.HTML5AudioSound>this.scene.sound.add("interactionCompleted");
        Assignment.assignmentCompleted = <Phaser.Sound.HTML5AudioSound>this.scene.sound.add("assignmentCompleted")
    }


    preUpdate(t: number, dt: number) {
        this.theTimer+=dt;
        if (this.theTimer > this.cfg.timePerDayMs * (this.currentDays+1)) {
            this.currentDays++;
            console.log("Día", this.currentDays)
            if (this.currentDays==this.cfg.numDays) {
                console.log("Assignment: TERMINADA SIN ÉXITO");
            } else {
                this.activateComputer();
            }
        }
    }

    activateComputer() {
        if (this.currentActiveComputers == this.cfg.maxActiveComputers)
            return;
        let aComputer = null;
        do {
            aComputer = Phaser.Math.RND.pick(this.computers.getChildren());
        } while(aComputer.active)
        (<Computer>aComputer).doWakeUp(6, 10000);
        this.currentActiveComputers++;
    }

    /**
     * Para que los computadores avisen de que se han apagado
     */
    onComputerShutdown() {
        this.currentActiveComputers--;
    }

    /**
     * Para que los computadores avisen de que se ha hecho una interacción
     * completa con ellos
     */
    onInteractionCompleted() {
        this.cfg.numIteractions--;
        if (this.cfg.numIteractions == 0 ) {
            Assignment.assignmentCompleted.play();
            console.log("Assignment completed");
        } else {
            Assignment.interactionCompleted.play();
        }
    }


}