export interface LetterConfig {
    // Posición inicial
    x: number,
    y: number,

    // La letra que representa
    theLetter: string,

    // Posición en la frase
    pos: number,

    // Configuración de cuándo cae
    delayBeforeShakeMs: number,
    shakeMs: number
}

export interface SentenceConfig {
    y: number,
    /**
     * Parámetros por defecto
     */
    delayBeforeShakeMs: number,
    shakeMs: number,
    extra: [
        {
            /**
             * Un rango puede ser: 
             * - Un número de posición
             * - Dos números separados por "-" (se incluyen ambos)
             */
            range: string,
            delayBeforeShakeMs: number,
            shakeMs: number,          
        }
    ]
}