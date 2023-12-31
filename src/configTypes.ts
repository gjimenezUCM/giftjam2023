/**
 * Información para configurar una letra
 */
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
    shakeMs: number,
    
    // Velocidad a la que cae la letra
    fallSpeed: number
}

/**
 * Información para configurar una frase que cae.
 * Tiene una información por defecto más un array
 * de configuraciones personalizadas para las distintas
 * letras (se pueden usar rangos para dejar caer palabras completas) 
 */
export interface SentenceConfig {
    /**
     * La frase que se esta configurando
     */
    sentence: string,

    /**
     * La altura a la que sale la frase (teniendo en cuenta que y=0 es arriba)
     */
    y: number,

    /**  --- PARÁMETROS POR DEFECTO --- 
     * Son compartidos por todas las letras de la frase
     */

    /** Tiempo (ms) que tarda en empezar a vibrar (antes de caer) */
    delayBeforeShakeMs: number,
    /** Tiempo (ms) que vibra la letra (antes de caer) */
    shakeMs: number,
    /** Velocidad a la que cae la letra */
    fallSpeed: number,

    /**  --- PARÁMETROS PERSONALIZADOS ---
    * Son los parámetros específicos que podemos poner a una letra
    * o a un rango de letras 
    * @see CustomLetterConfig
    */   
    custom: Array<CustomLetterConfig>
}

/**
 * Configuración personalizada de una o varias letras
 * Permite cambiar los parámetros de retardo antes de vibrar,
 * tiempo de vibración y/o velocidad de caída de una o varias letras
 * Las letras que van a ser personalizadas se definen en "range"
 */
export interface CustomLetterConfig {
    /**
     * Un rango puede ser: 
     * - Un número de posición (Ej. "5")
     * - Dos números separados por "-" (Ej. "5-10").
     *   En este caso, se personalizarán todas las letras entre ambas
     *   posiciones (ambas incluidas)
     */
    range: string,

    /**
     * Parámetros que se van a personalizar (son opcionales para no tener)
     * que poner todos
     */
    delayBeforeShakeMs?: number,
    shakeMs?: number,
    fallSpeed?: number
}