import MenuScene from "./scenes/MenuScene.js";
import AdventureScene from "./scenes/AdventureScene.js";
import TechnologyScene from "./scenes/TechnologyScene.js";


// ==========================================
// CONFIGURACIÓN GLOBAL DEL JUEGO
// ==========================================

const config = {

    type: Phaser.AUTO,

    width: 800,
    height: 450,

    backgroundColor: "#E7F8FB",


    // ==========================================
    // RENDERIZADO
    // ==========================================

    render: {

        // Suaviza los bordes de imágenes
        // y elementos gráficos.
        antialias: true,

        // Evita redondear innecesariamente
        // las posiciones de los objetos.
        roundPixels: false,

        // Aumenta la resolución interna del canvas.
        resolution: Math.min(
            window.devicePixelRatio || 1,
            2
        )
    },


    // ==========================================
    // FÍSICA
    // ==========================================

    physics: {

        default: "arcade",

        arcade: {

            gravity: {
                y: 800
            },

            debug: false
        }
    },


    // ==========================================
    // ESCALADO
    // ==========================================

    scale: {

        mode: Phaser.Scale.FIT,

        autoCenter: Phaser.Scale.CENTER_BOTH
    },


    // ==========================================
    // ESCENAS
    // ==========================================

    scene: [

        MenuScene,

        AdventureScene,

        TechnologyScene

    ]
};


// ==========================================
// CREAR EL JUEGO
// ==========================================

new Phaser.Game(config);