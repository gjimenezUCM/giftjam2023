import { CustomLetterConfig, LetterConfig, SentenceConfig } from "./configTypes";
import Letter from "./letter";
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
        this.activateLetters();
    }

    activateLetters() {
        for (let letter of this.getChildren()) {
            (<Letter>letter).onEnable();
        }
        this.numAliveLetters = this.numLetters;
    }

    letterHasFinished(aLetter:Letter) {
        this.numAliveLetters--;
        this.killAndHide(aLetter);
    }

    preUpdate(t: number, dt: number) {
        if (this.numAliveLetters == 0) {
            this.activateLetters();
        }
    }



    parseCustomLetters() {
        let result: Array<CustomLetterConfig> = [];
        let letterConf:CustomLetterConfig;
        for (letterConf of this.cfg.custom) {
            let range = letterConf.range.split("-");
            if (range.length==1) {
                result[parseInt(range[0])] = letterConf;
            } else {
                let init = parseInt(range[0]);
                let end = parseInt(range[1]);
                while (init<=end){
                    result[init] = letterConf;
                    init++;
                } 
            }
        }
        return result;
    }
} 