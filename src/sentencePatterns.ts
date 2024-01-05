import { SentenceConfig } from "./configTypes";

let patterns: Array < Array<SentenceConfig> >;

let curFallSpeed = 500;
let curShakeMs = 1000;
let curDelay = 1200
//------------- PATRÓN PRÁCTICA 0 -----------------//
let P0patterns = [
    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "9-13",
                delayBeforeShakeMs: curDelay *2, //2400,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: curDelay *3, //3600,
            },
            {
                range: "20-23",
                delayBeforeShakeMs: curDelay *4, //4800,
            },
        ]
    },

    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "9-13",
                delayBeforeShakeMs: curDelay * 3, //3600,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: curDelay * 2, //2400,
            },
            {
                range: "1-6",
                delayBeforeShakeMs: curDelay * 4, //4800,
            },
        ]
    },

    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "9-13",
                delayBeforeShakeMs: curDelay * 2, //2400,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: curDelay * 2, //2400,
            },
        ]
    }]

//------------- PATRÓN PRÁCTICA 1 -----------------//

curFallSpeed+=30; // 530
curShakeMs -=200;  // 800ms
curDelay -= 400; // 800ms

let P1patterns = [
    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "10-14",
                delayBeforeShakeMs: curDelay * 2, //1600,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: curDelay * 3, //2400,
            },
            {
                range: "19-22",
                delayBeforeShakeMs: curDelay * 4, //3200,
            },
        ]
    },

    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "16-17",
                delayBeforeShakeMs: curDelay * 2, //1600,
            },
            {
                range: "10-14",
                delayBeforeShakeMs: curDelay * 3, //2400,
            },
            {
                range: "3-8",
                delayBeforeShakeMs: curDelay * 4, //3200,
            },
        ]
    },

    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "10-14",
                delayBeforeShakeMs: curDelay * 2, // 1600,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: curDelay * 2, // 1600,
            },
        ]
    },
    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "2,4,6,8,10,12,14,17,20,22",
                delayBeforeShakeMs: curDelay * 2 // 1600
            },
        ]
    }
]

//------------- PATRÓN PRÁCTICA 2 -----------------//
curFallSpeed+=30; // 560
curShakeMs -= 300 // 700ms
let P2patterns = [
    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 1200,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "10-14",
                delayBeforeShakeMs: 1800,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: 2400,
            },
            {
                range: "19-22",
                delayBeforeShakeMs: 3000,
            },
        ]
    },

    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "16-17",
                delayBeforeShakeMs: 1600,
            },
            {
                range: "10-14",
                delayBeforeShakeMs: 2400,
            },
            {
                range: "3-8",
                delayBeforeShakeMs: 3000,
            },
        ]
    },

    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "10-14",
                delayBeforeShakeMs: 1600,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: 1600,
            },
        ]
    },
    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "2,4,6,8,10,12,14,17,20,22",
                delayBeforeShakeMs: 1600,
            },
        ]
    },
    {
        sentence: " ¡¡Suelta  ya  el  kit!! ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "15-23",
                delayBeforeShakeMs: 1600,
            },

        ]
    },

    {
        sentence: "  P  o  r  f  a  v  o  r",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 0,
        shakeMs: 250,
        fallSpeed: curFallSpeed,
        custom: [
        ]
    }
]

//------------- PATRÓN PRÁCTICA 3 -----------------//
curFallSpeed += 20; // 570
curShakeMs -= 200 // 500ms
curDelay -= 400; // 400ms
let P3patterns = [
    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 1200,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "10-14",
                delayBeforeShakeMs: 1800,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: 2400,
            },
            {
                range: "19-22",
                delayBeforeShakeMs: 3000,
            },
        ]
    },

    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "16-17",
                delayBeforeShakeMs: 1600,
            },
            {
                range: "10-14",
                delayBeforeShakeMs: 2400,
            },
            {
                range: "3-8",
                delayBeforeShakeMs: 3000,
            },
        ]
    },

    {
        sentence: "   ¿Quién tiene el kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "10-14",
                delayBeforeShakeMs: 1600,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: 1600,
            },
        ]
    },
    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "2,4,6,8,10,12,14,17,20,22",
                delayBeforeShakeMs: 1600,
            },
        ]
    },
    {
        sentence: " ¡¡Suelta  ya  el  kit!! ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 800,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "15-23",
                delayBeforeShakeMs: 1600,
            },

        ]
    },

    {
        sentence: "  P  o  r  f  a  v  o  r",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 0,
        shakeMs: 250,
        fallSpeed: curFallSpeed,
        custom: [
        ]
    },

    {
        sentence: " PedroPablo   tienelkit",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "6-10",
                delayBeforeShakeMs: curDelay + curDelay * 2 / 3,
            },
            {
                range: "15,16,18,19,21,22",
                delayBeforeShakeMs: curDelay + curDelay * 4 / 3,
            },
            {
                range: "14,17,20",
                delayBeforeShakeMs: curDelay + curDelay * 6 / 3,
            },
        ]
    },
    {
        sentence: "  Guillermo   tienelkit",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: curDelay,
        shakeMs: curShakeMs,
        fallSpeed: curFallSpeed,
        custom: [
            {
                range: "3,4,6,7,9,10",
                delayBeforeShakeMs: curDelay + curDelay * 2 / 3,
            },
            {
                range: "2,5,8",
                delayBeforeShakeMs: curDelay + curDelay * 4 / 3,
            },
        ]
    },

]
patterns = [
    P0patterns,
    P1patterns,
    P2patterns,
    P3patterns
]

export {patterns};