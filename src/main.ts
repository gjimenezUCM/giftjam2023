import 'phaser';
 import Boot from './boot';
 import Level from './level';
 import Menu from './menu';
 import Credits from './credits';
 import Final from './final';


window.onload = () => {
    let configObject: Phaser.Types.Core.GameConfig = {
        type: Phaser.WEBGL,
        parent: "thegame",
        scale: {
            width: 864,
            height: 704,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        },
        pixelArt: true,
        backgroundColor: '#2b2f4e',
        scene: [Boot, Credits, Menu, Level, Final],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                },
                debug: false
            }
        }
    };
    
    new Phaser.Game(configObject);

    let btn = document.getElementById("btn-telemetry");
    btn?.addEventListener("click", ()=>{
        let data:any[] = [];
        for (const [key, value] of Object.entries(window.localStorage)){
            data.push(JSON.parse(value));
        }
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        let downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `telemetry${Date.now()}.json`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    })

}