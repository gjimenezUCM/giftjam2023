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
    private currentInteractions = 0;
    private theTimer = 0;
    private numInteractions = 0;

    private static interactionCompleted: Phaser.Sound.HTML5AudioSound;
    private static assignmentCompleted: Phaser.Sound.HTML5AudioSound;

    private assignBar: Array<Phaser.GameObjects.Sprite>;
    private text: Phaser.GameObjects.Text;


    constructor(scene: Phaser.Scene, x:number, y:number, computerSet: Array<Computer>, config: AssignmentConfig) {
        this.scene = scene;
        this.cfg = config;
        this.computers = this.scene.physics.add.group(computerSet);
        for (let computer of this.computers.getChildren()) {
            (<Computer>computer).setAssignmentManager(this);
            (<Computer>computer).doShutdown();
        }
        this.currentActiveComputers = 0;
        Assignment.interactionCompleted = <Phaser.Sound.HTML5AudioSound>this.scene.sound.add("interactionCompleted");
        Assignment.assignmentCompleted = <Phaser.Sound.HTML5AudioSound>this.scene.sound.add("assignmentCompleted");
        this.createUI(x,y);
    }

    createUI(x: number, y: number) {
        let title = this.scene.add.text(
            x, y,
            `Práctica 0`,
            { fontFamily: 'Minecraft', fontSize: 18, color: '#ffffff' });
        title.setDepth(5000);

        let origX = x;
        let xOffset = title.displayWidth + 5;
        x += xOffset;
        let i = 0;
        let yOffset = title.displayHeight/2;
        y += yOffset;
        this.assignBar = [];
        this.assignBar[i] = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'assignBarSide');
        this.assignBar[i].setScale(2.0, 2.0);
        this.assignBar[i].setOrigin(0,0.5);
        this.assignBar[i].setPosition(x, y);
        this.assignBar[i].setDepth(5000);
        i++;

        this.scene.add.existing(this.assignBar[0]);
        while (i < this.cfg.numIteractions - 1) {
            let offsetX = this.assignBar[i - 1].displayWidth;
            this.assignBar[i] = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'assignBarCenter');
            this.assignBar[i].setScale(2.0, 2.0);
            this.assignBar[i].setOrigin(0,0.5);
            this.assignBar[i].setPosition(x + offsetX * i, y);
            this.assignBar[i].setDepth(5000);
            this.scene.add.existing(this.assignBar[i]);
            i++;
        }
        this.assignBar[i] = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'assignBarSide');
        this.assignBar[i].setScale(2.0, 2.0);
        this.assignBar[i].setOrigin(0,0.5);
        this.assignBar[i].flipX = true;
        this.assignBar[i].setPosition(x + this.assignBar[i - 1].displayWidth * i, y);
        this.assignBar[i].setDepth(5000);
        this.scene.add.existing(this.assignBar[i]);

        y += yOffset ;
        this.text = this.scene.add.text(
            origX, y,
            `Entrega en ${this.cfg.numDays - this.currentDays} días`, 
            { fontFamily: 'Minecraft', fontSize: 18, color: '#ffffff' });
        this.text.setOrigin(0, 0);
        this.text.setAlign('left');
        this.text.setDepth(5000);
    }


    preUpdate(t: number, dt: number) {
        this.theTimer+=dt;
        if (this.theTimer > this.cfg.timePerDayMs * (this.currentDays+1)) {
            this.currentDays++;
            this.text.setText(`Entrega en ${this.cfg.numDays - this.currentDays} días`);
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
        this.currentInteractions++;
        this.assignBar[this.currentInteractions-1].setFrame(1);
        if (this.currentInteractions === this.cfg.numIteractions) {
            Assignment.assignmentCompleted.play();
            console.log("Assignment completed");
        } else {
            Assignment.interactionCompleted.play();
        }
    }


}