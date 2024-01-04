/**
 * Créditos
 * @extends Phaser.Scene
 */

const names = [
    "A. ACHA",
    "J. ALONSO",
    "P. ARREDONDO",
    "S. BAÑA",
    "J. BELLO",
    "S. BLÁZQUEZ",
    "R. CABELLO",
    "J. CALLEJO",
    "J. CANO",
    "A. CARNICERO",
    "A. CARRERAS",
    "D. CASIANO",
    "I. DEL CASTILLO",
    "D. CASTILLO",
    "D. CHEN",
    "V.M. ESTREMERA",
    "P. ETAYO",
    "P. FERNÁNDEZ",
    "Ó. GARCÍA",
    "D. GIL",
    "L. GÓMEZ",
    "J.M. GÓMEZ",
    "M. GONZÁLEZ",
    "S.F. LÓPEZ",
    "A. LÓPEZ",
    "E. LUCAS",
    "D. MARTÍN",
    "M. MARTÍN",
    "J.D. MENDOZA",
    "M. MIGUEL",
    "A. MIGUELES",
    "S. MOLINERO",
    "P. MORILLAS",
    "A. MOURE",
    "J. MUÑOZ",
    "A. ORTEGA",
    "O. PEDREGAL",
    "A. POVEDANO",
    "J. RAMOS",
    "A.J. RODULFO",
    "D. ROL",
    "A. RUBIO",
    "J. RUBIO",
    "D. RUIZ",
    "R. SAAVEDRA",
    "P. SÁNCHEZ",
    "I. SÁNCHEZ",
    "E. SÁNCHEZ",
    "R. SÁNCHEZ",
    "E. TODD",
    "J. VILLACAÑAS",
    "J. VILLEGAS",
    "J. ZURDO"
]
export default class Credits extends Phaser.Scene {
    
    private activationKey: Phaser.Input.Keyboard.Key;

    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'credits' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        let startingYPos = 16;
        let yPos = startingYPos;
        let xPos = <number>this.game.config.width / 2;

        // Título
        let title = this.add.text(
            xPos, yPos,
            '¿Quién tiene el kit?',
            { fontFamily: 'Minecraft', fontSize: 30, color: '#ffffff' });
        title.setOrigin(0.5, 0.5);
        title.setAlign('center');
        yPos += title.displayHeight;

        // Subtítulo
        let subTitle = this.add.text(
            xPos, yPos,
            'GiftJam 2023',
            { fontFamily: 'Minecraft', fontSize: 24, color: '#ffffff' });
        subTitle.setOrigin(0.5, 0.5);
        subTitle.setAlign('center');

        yPos += subTitle.displayHeight + 16;

        // Descripción tras el título
        let paragraph = "Un regalo para los estudiantes de la asignatura de Videojuegos en consola 23/24\n"+
        "del Grado en Desarrollo de Videojuegos de la Universidad Complutense...";

        let numCols = 4;
        yPos = this.writeParagraph(xPos, yPos, paragraph, 5);
        yPos+=16;


        // Nombres de estudiantes en columnas
        let namesPerCol = Math.ceil(names.length / numCols);

        xPos = (<number>this.game.config.width / (numCols+1));
        let xOffset = xPos;
        startingYPos = yPos;
        let i=0;
        let maxYPos = yPos;
        while(i < names.length) {
            let aName = names[i];            
            let textName = this.add.text(
                xPos, yPos,
                aName,
                { fontFamily: 'Minecraft', fontSize: 12, color: '#ffffff' });
            textName.setOrigin(0.5, 0.5);
            textName.setAlign('center');
            yPos += textName.displayHeight;
            maxYPos = Math.max(yPos,maxYPos);
            i++;
            if (i % namesPerCol === 0){
                xPos += xOffset;
                yPos = startingYPos;
            }   
        }
        yPos = maxYPos;
        paragraph =
            `...y para los que la cursaron...\n...y para los que la cursarán`
        xPos = <number>this.game.config.width / 2;
        yPos = this.writeParagraph(xPos, yPos+16, paragraph, 5);

        paragraph = "CREADO POR\nG. Jiménez";
        yPos = this.writeParagraph(xPos, yPos + 16, paragraph);

        paragraph = "BETATESTERS\nP.P. Gómez y C. León";
        yPos = this.writeParagraph(xPos, yPos + 16, paragraph);

        paragraph = "GRÁFICOS\nLimeZu (https://limezu.itch.io/)\n"+
                    "BDragon1727 (https://bdragon1727.itch.io/)\n"+
                    "vryell (https://vryell.itch.io/)";
        yPos = this.writeParagraph(xPos, yPos + 16, paragraph);

        paragraph = "SONIDO\nJuhani Junkala (https://juhanijunkala.com/)\n"+
            "BloodPixelHero (https://freesound.org/people/BloodPixelHero/)";
        yPos = this.writeParagraph(xPos, yPos + 16, paragraph);

        let startTextPosX = xPos;
        let startTextPosY = yPos+32;
        let startText = this.add.text(
            startTextPosX, startTextPosY,
            'Menú',
            { fontFamily: 'Minecraft', fontSize: 24, color: '#ffffff' });
        startText.setOrigin(0.5,0.5);
        startText.setAlign('center');

        let startKeySpriteX = startTextPosX + startText.displayWidth/2 + 5;
        let startKeySprite = this.add.existing(new Phaser.GameObjects.Sprite(this, 0, 0, 'startKey'));
        startKeySprite.setScale(2.0, 2.0);
        startKeySprite.setOrigin(0, 0);
        startKeySprite.setPosition(startKeySpriteX, startTextPosY-16);
        startKeySprite.play("startKey-idle");
        startKeySprite.setDepth(5000);
        if (this.input.keyboard !== null) {
            this.activationKey = this.input.keyboard.addKey('E');
        }
    }

    update(time: number, dt: number) {
        if (Phaser.Input.Keyboard.JustDown(this.activationKey)) {
            this.scene.start('menu');
        }
    }

    /**
     * 
     * @param x Posición x del texto (quedará centrado sobre esa posición)
     * @param y Posición y inicial
     * @param theText El texto a escribir. Cada línea está separada por \n
     * @param lineSpacing Espaciado adicional entre líneas
     * @returns La posición y final (para poder poner más texto a continuación)
     */
    writeParagraph(x:number, y:number, theText:string, lineSpacing:number=0):number {
        let lines = theText.split("\n");
        let yPos = y;
        for (let aLine of lines) {
            let desc = this.add.text(
                x, yPos,
                aLine,
                { fontFamily: 'Minecraft', fontSize: 12, color: '#ffffff'});
            desc.setOrigin(0.5, 0.5);
            desc.setAlign('center');

            yPos += desc.displayHeight + lineSpacing;
        }
        return yPos-lineSpacing;
    }



}