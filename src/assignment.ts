import Computer from './computer';
import { AssignmentConfig, AssignmentResult } from './configTypes';
import Level from './level';


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
    private scene: Level;

    private currentActiveComputers = 0;
    private currentDays = 0;
    private currentInteractions = 0;
    private theTimer = 0;
    private numInteractions = 0;
    private completed = false;
    private activated = false;
    
    private result: AssignmentResult;
    /**
     * Sounds
     */
    private static interactionCompletedSound: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound;
    private static assignmentCompletedSound: Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.NoAudioSound;
    

    /**
     * UI
     */
    private assignBar: Array<Phaser.GameObjects.Sprite>;
    private text: Phaser.GameObjects.Text;


    constructor(scene: Level, x:number, y:number, computerSet: Array<Computer>, config: AssignmentConfig) {
        this.scene = scene;
        this.cfg = config;
        this.computers = this.scene.physics.add.group(computerSet);
        for (let computer of this.computers.getChildren()) {
            (<Computer>computer).setAssignmentManager(this);
            (<Computer>computer).doShutdown();
        }
        this.currentActiveComputers = 0;
        Assignment.interactionCompletedSound = this.scene.sound.add("interactionCompleted");
        Assignment.assignmentCompletedSound = this.scene.sound.add("assignmentCompleted");
        this.createUI(x,y);
    }

    onActivate() {
        this.activated = true;
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
        if (this.activated && !this.completed){
            this.theTimer+=dt;
            // Añadimos un día más al conteo
            if (this.theTimer > this.cfg.timePerDayMs * (this.currentDays+1)) {
                this.currentDays++;
                this.currentDays = this.currentDays > this.cfg.numDays ? this.cfg.numDays : this.currentDays;
                this.text.setText(`Entrega en ${this.cfg.numDays - this.currentDays} días`);
                // Comprobamos si hemos llegado al deadline
                if (this.currentDays==this.cfg.numDays) {
                    this.text.setText("Práctica no entregada");
                    this.scene.onPlayerDead(); 
                    this.completed = true;
                    this.completeAndShutdown({ resultType: "FAIL" });
    
                } else {
                    this.activateComputer();
                }
            }
        }
    }

    activateComputer() {
        if (!this.completed) {
            if (this.currentActiveComputers == this.cfg.maxActiveComputers)
                return;
            let aComputer = null;
            do {
                aComputer = Phaser.Math.RND.pick(this.computers.getChildren());
            } while(aComputer.active)
            (<Computer>aComputer).doWakeUp(6, 10000);
            this.currentActiveComputers++;
        }
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
        if (!this.completed) {
            this.currentInteractions++;
            this.assignBar[this.currentInteractions-1].setFrame(1);
            // Se han completado todas las interacciones por lo que
            // se ha terminado la práctica a tiempo
            if (this.currentInteractions === this.cfg.numIteractions) {
                Assignment.assignmentCompletedSound.play();
                this.text.setText("¡Práctica completada!");
                this.completeAndShutdown({resultType: "PASS"});
            } else {
                Assignment.interactionCompletedSound.play();
            }
        }
    }

    completeAndShutdown(result: AssignmentResult) {
        for (let computer of this.computers.getChildren()) {
            (<Computer>computer).doShutdown();
        }
        this.result = result;
        this.completed = true;
        this.scene.onLevelCompleted(result);
    }


}