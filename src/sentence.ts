import Letter from "./letter";
export default class Sentence extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, aSentence:string) {
        super(scene);
        const offset = 32;
        let x= offset/2;
        const y=100;
        let pos = 0;
        for (let letter of aSentence) {
            if (letter !==" "){
                this.add(
                    new Letter( scene,
                                this,
                                {
                                    x: x,
                                    y: y,
                                    theLetter: letter,
                                    pos: pos,
                                    delayBeforeShakeMs: 2000,
                                    shakeMs: 1500
                                })
                );
            }
            x+=offset;
            pos++;
        }
    }

    letterHasFinished(aLetter:Letter) {
        console.log("Ha terminado", aLetter.pos);
        this.killAndHide(aLetter);
    }
} 