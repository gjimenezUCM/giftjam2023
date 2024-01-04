import { SentenceConfig } from "./configTypes";

let patterns: Array < Array<SentenceConfig> >;

let P0patterns = [
    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 1500,
        shakeMs: 1500,
        fallSpeed: 400,
        custom: [
            {
                range: "9-13",
                delayBeforeShakeMs: 3000,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: 4000,
            },
            {
                range: "20-23",
                delayBeforeShakeMs: 5000,
            },
        ]
    },

    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 1500,
        shakeMs: 1500,
        fallSpeed: 400,
        custom: [
            {
                range: "9-13",
                delayBeforeShakeMs: 4000,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: 3000,
            },
            {
                range: "1-6",
                delayBeforeShakeMs: 5000,
            },
        ]
    },

    {
        sentence: " ¿Quién  tiene  el  kit? ",
        y: 32 * 4 - 32 / 2 - 1,
        delayBeforeShakeMs: 1500,
        shakeMs: 1500,
        fallSpeed: 400,
        custom: [
            {
                range: "9-13",
                delayBeforeShakeMs: 3000,
            },
            {
                range: "16-17",
                delayBeforeShakeMs: 3000,
            },
        ]
    }]
patterns = [
    P0patterns,
    P0patterns,
    P0patterns,
    P0patterns
]

export {patterns};