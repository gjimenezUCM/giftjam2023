import { AssignmentResult, FinalData } from "./configTypes";
import theTelemetry from './telemetry';
/**
 * Menu
 * @extends Phaser.Scene
 */
export default class Final extends Phaser.Scene {
    
    private returnKey: Phaser.Input.Keyboard.Key;
    private finalResults: FinalData;

    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'final' });
    }

    init(data: FinalData) {
        this.finalResults = data;
    }

    /**
     * Creación de los elementos de la escena de final de juego
     */
    create() {
        let xPos = <number>this.game.config.width / 2;
        let yPos = 2*32;

        let titleText = this.add.text(
            xPos, yPos,
            'Resultados',
            { fontFamily: 'Minecraft', fontSize: 48, color: '#ffffff' });
        titleText.setOrigin(0.5, 0.5);
        titleText.setAlign('center');
        yPos+=titleText.displayHeight+32;

        for (let result of this.finalResults.assignmentResults){
            yPos = this.displayAssignmentResult(<number>this.game.config.width / 6, yPos, result);
            yPos+=32;
        }

        if (this.finalResults.globalGrade === "PASS") {
            yPos = this.displayWhen(xPos, yPos,
                "Todas las prácticas aprobadas, así que nos veremos en la",
                "CONVOCATORIA\nORDINARIA"); 
        } else {
            yPos = this.displayWhen(xPos, yPos,
                "Con una práctica suspensa nos veremos en la",
                "CONVOCATORIA\nEXTRAORDINARIA");            
        }

        yPos=20*32;
        let menuText = this.add.text(
            xPos, yPos,
            'Menú',
            { fontFamily: 'Minecraft', fontSize: 30, color: '#ffffff' });
        menuText.setOrigin(0.5, 0.5);
        menuText.setAlign('center');

        let startKeySpriteX = xPos + menuText.displayWidth / 2 + 5;
        let startKeySprite = this.add.existing(new Phaser.GameObjects.Sprite(this, 0, 0, 'returnKey'));
        startKeySprite.setScale(2.0, 2.0);
        startKeySprite.setOrigin(0, 0);
        startKeySprite.setPosition(startKeySpriteX, yPos - 16);
        startKeySprite.play("returnKey-idle");

        if (this.input.keyboard !== null) {
            this.returnKey = this.input.keyboard.addKey('M');
        }
    }

    displayAssignmentResult(x:number, y:number, result: AssignmentResult):number {
        
        let icon = this.add.existing(new Phaser.GameObjects.Sprite(this, 0,0, 'passFail'));
        icon.setScale(2);
        let xPos = x;
        let yPos = y;
        icon.setPosition(xPos, yPos);
        icon.play(result.resultType);
        xPos += icon.displayWidth;
        
        let titleColor = result.resultType === "PASS"? '#ffffff': '#999999'
        let title = this.add.text(
            0, 0,
            result.assignmentId,
            { fontFamily: 'Minecraft', fontSize: 24, color: titleColor });
        title.setOrigin(0, 0.5);
        title.setAlign('left');
        title.setPosition(xPos, yPos);
        xPos += title.displayWidth;
        if (result.resultType === "PASS") {
            let days = result.numDays - result.numDaysWhenCompleted;
            let desc = this.add.text(
                0, 0,
                `: Te ${days == 1 ? "sobró" : "sobraron"} ${days} día${days==1?"":"s"}`,
                { fontFamily: 'Minecraft', fontSize: 24, color: titleColor });
            desc.setOrigin(0, 0.5);
            desc.setAlign('left');
            desc.setPosition(xPos, yPos);            
        }

        yPos += title.displayHeight;
        return yPos;
    }

    displayWhen(x:number, y: number,textDesc:string, textWhen:string):number {
        let titleText = this.add.text(
            x, y,
            textDesc,
            { fontFamily: 'Minecraft', fontSize: 18, color: '#ffffff' });
        titleText.setOrigin(0.5, 0.5);
        titleText.setAlign('center');
        y += titleText.displayHeight + 32*2;  
        let whenText = this.add.text(
            x, y,
            textWhen,
            { fontFamily: 'Minecraft', fontSize: 32, color: '#ffffff', lineSpacing:12 });
        whenText.setOrigin(0.5, 0.5);
        whenText.setAlign('center');
        y += titleText.displayHeight + 16;         
        return y;
    }

    update(time: number, dt: number) {
        if (Phaser.Input.Keyboard.JustDown(this.returnKey)) {
            theTelemetry.trackEvent("GAME:END", { result: this.finalResults.globalGrade });
            theTelemetry.flush();
            this.scene.start('menu');
        }
    }



}