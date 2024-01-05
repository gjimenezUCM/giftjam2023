import { CustomLetterConfig, LetterConfig, SentenceConfig } from "./configTypes";
import Letter from "./letter";
import Level from "./level";
export default class Sentence extends Phaser.GameObjects.Group {

    /**
     * Configuración de cada una de las letras de la frase
     */
    private letterConfigs: Array<LetterConfig>;

    private cfg: SentenceConfig;
    private numLetters: number;
    private numAliveLetters: number;

    constructor(scene: Phaser.Scene, config:SentenceConfig) {
        super(scene);
        const offset = 32;
        let x= offset/2;
        x+=offset;
        const y=config.y;
        let pos = 0;
        this.cfg = config;
        this.numLetters = 0;
        let customLetters: Array<CustomLetterConfig> = this.parseCustomLetters();
        for (let letter of config.sentence) {
            if (letter !==" "){
                let defaultLetterConfig = {
                    x: x,
                    y: y,
                    theLetter: letter,
                    pos: pos,
                    delayBeforeShakeMs: config.delayBeforeShakeMs,
                    shakeMs: config.shakeMs,
                    fallSpeed: config.fallSpeed
                }
                this.numLetters++;
                if (customLetters[pos]) {
                    if ("delayBeforeShakeMs" in customLetters[pos]){
                        defaultLetterConfig.delayBeforeShakeMs = <number>customLetters[pos].delayBeforeShakeMs;
                    }
                    if ("shakeMs" in customLetters[pos]) {
                        defaultLetterConfig.shakeMs = <number>customLetters[pos].shakeMs;
                    }
                    if ("fallSpeed" in customLetters[pos]){
                        defaultLetterConfig.fallSpeed = <number>customLetters[pos].fallSpeed;
                    }                    
                }

                this.add(
                    new Letter( scene,this, defaultLetterConfig)
                );
            }
            x+=offset;
            pos++;
        }
        //this.activateLetters();
    }

    onActivate() {
        for (let letter of this.getChildren()) {
            (<Letter>letter).onEnable();
        }
        this.numAliveLetters = this.numLetters;
    }

    onLevelComplete() {
        for (let letter of this.getChildren()) {
            this.killAndHide(letter);
        }   
    }

    letterHasFinished(aLetter:Letter) {
        this.numAliveLetters--;
        this.killAndHide(aLetter);
    }

    preUpdate(t: number, dt: number) {
        if (this.numAliveLetters == 0) {
            //this.onActivate();
            (<Level>this.scene).onSentenceCompleted();
        }
    }

    parseCustomLetters() {
        let result: Array<CustomLetterConfig> = [];
        let letterConf:CustomLetterConfig;
        for (letterConf of this.cfg.custom) {
            if (letterConf.range.includes("-")) {
                // hemos puesto un rango de letras "init-end"
                let range = letterConf.range.split("-");
                let init = parseInt(range[0]);
                let end = parseInt(range[1]);
                while (init <= end) {
                    result[init] = letterConf;
                    init++;
                } 
            } else if (letterConf.range.includes(",")) {
                // Hemos puesto posiciones sueltas, separadas por comas
                let range = letterConf.range.split(",");
                for (let pos of range) {
                    result[parseInt(pos) ] = letterConf;
                }              

            } else {
                // Solo hay una posición
                result[parseInt(letterConf.range)] = letterConf;
            }
        }
        return result;
    }
} 